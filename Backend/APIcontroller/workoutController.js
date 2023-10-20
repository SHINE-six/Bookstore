const { mongoose }= require('mongoose');
const Workout = require('../models/WorkoutModel');


const getWorkouts = async(req, res) => {
    const workout = await Workout.find().sort({updatedAt: -1});
    console.log('who call me');

    res.status(200).json(workout);
}

const getSingleWorkout = async(req, res) => {
    const { title } = req.params;
    const workout = await Workout.find({title: title});

    if (!workout) {
        return res.status(404).json({message: 'Workout not found!'});
    }

    res.status(200).json(workout);

    
}

const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body;
    try {
        const workout = await new Workout({title, reps, load});
        workout.save();
        res.status(200).json(workout);
        console.log('POST success: \n-----------\n', workout, '\n-----------\n')
    } catch (error){
        res.status(400).json({message: error.message});
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndDelete({_id: id})
  
    if(!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
}
  
// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
}

module.exports = {getWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout};