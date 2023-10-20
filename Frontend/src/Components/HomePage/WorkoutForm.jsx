import React, { useState, useEffect } from 'react';

const WorkoutForm = ({selectedWorkout}) => {
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        setTitle(selectedWorkout.title);
        setReps(selectedWorkout.reps);
        setLoad(selectedWorkout.load);
        if (selectedWorkout !== '') {
            setUpdateMode(true);
        }
        else {
            setUpdateMode(false);
            setTitle('');
            setReps('');
            setLoad('');
        }
    }, [selectedWorkout]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (updateMode === true) {
            const EditedWorkout = { title, reps, load };

            const response = await fetch(`http://localhost:4000/api/workouts/${selectedWorkout._id}`, {
                method: 'PATCH',
                body: JSON.stringify(EditedWorkout),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json();

            if (response.ok) {
                setTitle('');
                setReps('');
                setLoad('');
                setUpdateMode(false);
                console.log("new Workout added: \n" + json);
            }
            if (!response.ok) {
                console.log("Error: " + json);
            }
        }

        if (updateMode === false) {
            if (title !== '' && reps !== '' && load !== '') {
                const newWorkout = { title, reps, load };

                const response = await fetch('http://localhost:4000/api/workouts/', {
                    method: 'POST',
                    body: JSON.stringify(newWorkout),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json();

                if (response.ok) {
                    setTitle('');
                    setReps('');
                    setLoad('');
                    console.log("new Workout added: \n" + json);
                }
                if (!response.ok) {
                    console.log("Error: " + json);
                }
            }
            else {
                alert("Please fill in all fields");
            }
        }
    }

    return (
        <form className='w-64 h-fit flex flex-col gap-6' onSubmit={handleSubmit}>
            <div className='text-xl font-black'>Add a new Workout</div>
            
            <div className='flex flex-col gap-2'>
                <label>Exercise Title:</label>
                <input className='h-8 w-auto shadow-inner mx-1 px-2' type="text" placeholder='eg. Bench Press' 
                        onChange={(e) => setTitle(e.target.value)} value={title}/>
            </div>

            <div className='flex flex-col'>
                <label>Load (in kg):</label>
                <input className='h-8 w-auto shadow-inner mx-1 px-2' type="number" placeholder='eg. 20'
                        onChange={(e) => setLoad(e.target.value)} value={load}/>
            </div>
            
            <div className='flex flex-col'>
                <label>Reps:</label>
                <input className='h-8 w-auto shadow-inner mx-1 px-2' type="number" placeholder='eg. 15' 
                        onChange={(e) => setReps(e.target.value)} value={reps}/>
            </div>
            

            

            {updateMode? 
                <button className='w-32 h-8 rounded-md shadow-xl justify-center bg-lime-400 text-black'>Edit workout</button>
                : <button className='w-32 h-8 rounded-md shadow-xl justify-center bg-indigo-600 text-white'>Add workout</button>}
        </form>
    )

}

export default WorkoutForm;