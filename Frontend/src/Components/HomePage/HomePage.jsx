import React, { useState, useEffect } from 'react';

import WorkoutDetails from '../WorkoutDetails';
import WorkoutForm from './WorkoutForm';


const HomePage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const [preSelectTitle, setPreSelectTitle] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            async function fetchWorkout() {
                const response = await fetch(`http://localhost:4000/api/workouts/${selectedTitle}`);
                console.log(response);
                const json = await response.json();

                if (response.ok) {
                    setWorkouts(json);
                }
            }
            fetchWorkout()
        }, 1000);
        
    })


    async function handleClickForDelete() {
        const response = await fetch(`http://localhost:4000/api/workouts/${selectedWorkout._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: 'selectedWorkout' })
        });
    }

    function handleSelectWorkout(workout) {
        setSelectedWorkout(workout);
        setPreSelectTitle(workout.title);
    }

    function handleSearch() {
        setSelectedTitle(preSelectTitle);
    }

    function handleClear() {
        setSelectedTitle('');
        setPreSelectTitle('');
        setSelectedWorkout('');
    }
    function renderWorkoutForm(){
        const [element,setElement] = useState(null);

        useEffect(() => {
            setElement(<WorkoutForm selectedWorkout={selectedWorkout}/>);
        },[selectedWorkout])
        return (
            element
        )
    }

    return (
        <div className='flex flex-row w-full justify-evenly my-8'> 
            <div className='flex flex-col w-1/2'>
                <div className='flex flex-row justify-around w-full'>
                    <div className='w-20 h-12 rounded-xl flex justify-center align-bottom items-center text-xl font-semibold text-white bg-indigo-500' onClick={handleSearch}>Search</div>
                    <div className='w-20 h-12 rounded-xl flex justify-center align-bottom items-center text-xl font-semibold text-white bg-rose-600' onClick={handleClickForDelete}>Delete</div>
                    <div className='w-20 h-12 rounded-xl flex justify-center align-bottom items-center text-xl font-semibold text-white bg-lime-500' onClick={handleClear}>Clear</div>
                </div>
                
                <div className='flex flex-col gap-8 my-8'>
                    {workouts && workouts.map(workout => (
                        <WorkoutDetails key={workout.id} workout={workout} selected={handleSelectWorkout}/>
                    )
                )}
                
                </div>
            </div>
            {renderWorkoutForm()}
            
        </div>
    )

}

export default HomePage;