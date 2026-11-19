const Workout = require("../models/Workout");

const addWorkout = async (req, res) => {
  try {
    const { name, duration } = req.body;

    if (!name || !duration) {
      return res.status(400).json({ error: "Name and duration are required" });
    }

    const workout = await Workout.create({
      name,
      duration,
      userId: req.user.id,
      status: req.body.status || "pending",
    });

    res.status(201).json({
      message: "Workout added successfully",
      workout,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });

    res.status(200).json({workouts});
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    // Only the owner may update their own workout
    if (workout.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You can only update your own workouts" });
    }

    const { name, duration, status } = req.body;

    if (name !== undefined) workout.name = name;
    if (duration !== undefined) workout.duration = duration;
    if (status !== undefined) workout.status = status;

    await workout.save();

    res.status(200).json({
      message: "Workout updated successfully",
      workout,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    if (workout.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You can only delete your own workouts" });
    }

    await workout.deleteOne();

    res.status(200).json({
      message: "Workout deleted successfully",
      workout,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const completeWorkoutStatus = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    if (workout.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You can only update your own workouts" });
    }

    workout.status = "completed";
    await workout.save();

    res.status(200).json({
      message: "Workout marked as completed",
      workout,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addWorkout,
  getMyWorkouts,
  updateWorkout,
  deleteWorkout,
  completeWorkoutStatus,
};