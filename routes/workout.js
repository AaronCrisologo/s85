const express = require("express");
const router = express.Router();
const {
  addWorkout,
  getMyWorkouts,
  updateWorkout,
  deleteWorkout,
  completeWorkoutStatus,
} = require("../controllers/workoutController");
const auth = require("../auth");

router.post("/addWorkout", auth, addWorkout);
router.get("/getMyWorkouts", auth, getMyWorkouts);
router.put("/updateWorkout/:id", auth, updateWorkout);
router.delete("/deleteWorkout/:id", auth, deleteWorkout);
router.patch("/completeWorkoutStatus/:id", auth, completeWorkoutStatus);

module.exports = router;