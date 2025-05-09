import React, { useState } from "react";
import { motion } from "framer-motion";

function ThumbsDownIcon({ disliked }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      whileTap={{ scale: 1.2 }}
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="cursor-pointer focus:outline-none focus:ring-0"
    >
      <motion.path
        fill={disliked ? "#FC607F" : "rgba(0, 0, 0, 0)"}
        stroke="#FC607F"
        strokeWidth="2"
        d="M17 13.0001L13 22.0001C12.2044 22.0001 11.4413 21.684 10.8787 21.1214C10.3161 20.5588 10 19.7958 10 19.0001V15.0001H4.34003C4.05012 15.0034 3.76297 14.9436 3.49846 14.8249C3.23395 14.7062 2.99842 14.5314 2.80817 14.3126C2.61793 14.0938 2.47753 13.8363 2.39669 13.5579C2.31586 13.2794 2.29652 12.9868 2.34003 12.7001L3.72003 3.70012C3.79235 3.22321 4.0346 2.78851 4.40212 2.47611C4.76965 2.16371 5.2377 1.99466 5.72003 2.00012H17M17 13.0001V2.00012M17 13.0001H19.67C20.236 13.0101 20.7859 12.812 21.2154 12.4433C21.645 12.0746 21.9242 11.5611 22 11.0001V4.00012C21.9242 3.43918 21.645 2.92562 21.2154 2.55694C20.7859 2.18825 20.236 1.99011 19.67 2.00012H17"
        initial={{ fill: "rgba(0, 0, 0, 0)", scale: 1 }}
        animate={
          disliked
            ? { fill: "#FC607F", scale: 1.1 }
            : { fill: "rgba(0, 0, 0, 0)", scale: 1 }
        }
        transition={{ duration: 0.3 }}
      />
    </motion.svg>
  );
}

export default ThumbsDownIcon;
