const express = require('express');
const { getWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../APIcontroller/workoutController');

const router = express.Router();

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout
router.get('/:title', getSingleWorkout);

// POST a workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)


module.exports = router;