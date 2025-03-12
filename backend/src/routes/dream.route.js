const express = require("express");
const {
  addRawDream,
  retryAnalysis,
  getAllDreams,
  toggleLike,
} = require("../controllers/dream.controller.js");

// Middleware to verify the access token
const verifyJWT = require("../middlewares/verifyJWT.js");

const router = express.Router();

router.post("/", verifyJWT, addRawDream);
router.get("/getdreams", verifyJWT, getAllDreams);
router.post("/:id/retry", verifyJWT, retryAnalysis);
router.put("/:id/like", verifyJWT, toggleLike);

module.exports = router;
