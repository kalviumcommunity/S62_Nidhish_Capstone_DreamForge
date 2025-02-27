import { useState } from "react";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { FaEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function DreamDetailsOverlay({ dream, setOpenOverlay }) {
  const [liked, setLiked] = useState(dream.isLiked);
  const positivePercentage = dream.sentiment.positive;
  const negativePercentage = dream.sentiment.negative;

  // Determine the progress bar width and color based on the higher percentage
  const progressWidth = Math.max(positivePercentage, negativePercentage);
  const emotion =
    positivePercentage > negativePercentage ? "Positive" : "Negative";
  const progressColor =
    positivePercentage > negativePercentage ? "bg-green-400" : "bg-red-400";

  const sentimentData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [
          dream.sentiment.positive,
          dream.sentiment.negative,
          dream.sentiment.neutral,
        ],
        backgroundColor: ["#4CAF50", "#E63946", "#CCCCCC"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 z-30 "
      onClick={() => setOpenOverlay(false)}
    >
      <div
        className="max-w-4xl w-[95%] md:w-2/3 max-h-full h-auto  z-50 text-white overflow-y-auto bg-gradient-to-br from-[#752345] to-[#352736] backdrop-blur-md p-6 rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <FaArrowLeft
            className="text-xl cursor-pointer"
            onClick={() => setOpenOverlay(false)}
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold">{dream.title}</h1>
            <p className="text-xs mt-2 text-gray-300">{dream.date}</p>
          </div>
          {/* Heart Button */}
          <div className="w-8 h-8 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setLiked(!liked)}
              className="text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`w-6 h-6 ${
                  liked
                    ? "fill-red-500 stroke-red-500"
                    : "stroke-red-500 fill-none"
                }`}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Image and Doughnut Chart */}
          <div>
            <img
              src={dream.image}
              alt="Dream visualization"
              className="rounded-lg w-full shadow-md"
            />
            <div className="bg-white/10 p-4 rounded-lg mt-4">
              <h2 className="text-lg font-semibold">Sentiment Analysis:</h2>
              <div className="w-full">
                <Doughnut data={sentimentData} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Description:</h2>
            <div className="bg-white/25 rounded-2xl px-5 py-6 mt-2">
              <p className="text-gray-300">{dream.description}</p>
            </div>
            <h2 className="text-xl font-semibold mt-4">Meaning:</h2>
            <div className="bg-white/25 rounded-2xl px-5 py-6 mt-2">
              <p className="text-gray-300">{dream.meaning}</p>
            </div>
            <h2 className="text-xl font-semibold mt-4">Keywords:</h2>
            <div className="flex gap-2 mt-2">
              {["Stars", "Ocean", "Flying"].map((tag) => (
                <span
                  key={tag}
                  className="bg-white/50 px-3 py-1 rounded-full text-white text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl text-white font-semibold mt-4">
              {emotion == "Positive" ? "Positivity" : "Negativity"}
            </h2>
            {/* Progress Bar */}
            <div className="w-[90%] h-3 bg-gray-300 rounded-full overflow-hidden mt-2">
              <motion.div
                className={`h-full ${progressColor}`}
                initial={{ width: "0%" }}
                animate={{ width: `${progressWidth}%` }} // Adjust for progress
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-sm text-gray-300 mt-1">
              {progressWidth}% {emotion}
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center mt-6">
          <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-gray-300">
            <FaArrowLeft /> Prev
          </button>
          <button className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full text-white">
            <FaEdit /> Edit
          </button>
          <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-gray-300">
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
