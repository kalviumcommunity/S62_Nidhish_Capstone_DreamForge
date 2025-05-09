import React, { useState, useEffect } from "react";
import DreamCard from "../components/Cards/DreamCard";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { io } from "socket.io-client";
import Person_sleeping from "../assets/Person_sleeping.png";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const MyDreamsPage = () => {
  const [dreams, setDreams] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const { ref, inView } = useInView();
  const axiosPrivate = useAxiosPrivate();

  // Socket.IO for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:8080", {
      withCredentials: true,
    });

    socket.on("dream-updated", (updatedDream) => {
      setDreams((prev) =>
        prev.map((d) =>
          d._id === updatedDream._id ? { ...d, ...updatedDream } : d
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  // Fetch dreams (infinite scroll)
  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const response = await axiosPrivate.get(
          `/dream/getdreams?page=${page}`
        );
        const newDreams = response.data.dreams;

        setDreams((prev) => [...prev, ...newDreams]);
        setHasMore(response.data.currentPage < response.data.totalPages);
      } catch (error) {
        toast.error("Failed to load dreams. Please try again.");
        console.error("Error fetching dreams:", error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    if (hasMore) {
      fetchDreams();
    }
  }, [page]);

  // Trigger next page when ref comes into view
  useEffect(() => {
    if (inView && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  // Retry a failed dream processing
  const handleRetry = async (dreamId) => {
    try {
      await axiosPrivate.post(`/dream/${dreamId}/retry`);
      toast.success("Retrying dream analysis...");
    } catch (error) {
      toast.error("Retry failed. Please try again later.");
      console.error("Retry failed:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] px-4 py-8">
      {initialLoad ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <Skeleton className="h-96 w-72 bg-muted rounded-xl" />
            </div>
          ))}
        </div>
      ) : dreams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-0">
          {dreams.map((dream) => (
            <DreamCard key={dream._id} dream={dream} onRetry={handleRetry} />
          ))}
          {hasMore && (
            <div ref={ref} className="col-span-full flex justify-center">
              <div className="animate-pulse">
                <Skeleton className="h-96 w-72 bg-muted rounded-xl" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <img
            src={Person_sleeping}
            alt="No dreams"
            className="w-96 h-96 object-contain opacity-80"
          />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
            No dreams yet... Sleep more and dream big!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Your dream journal is empty. Start logging your dreams to analyze
            them.
          </p>
          <Button
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition"
            onClick={() => toast.info("Dream logging coming soon!")}
          >
            Log a Dream
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyDreamsPage;
