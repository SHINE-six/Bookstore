import React, { useState } from "react";

const WorkoutDetails = ({ workout, selected }) => {
    const[onHover, setOnHover] = useState(false);
    const TextColor = onHover ? "text-white" : "text-black";

    function handleClick() {
        selected(workout);
    }
    return (
        <div onClick={handleClick} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} className={`flex flex-col rounded-md shadow-xl w-full px-4 py-4 bg-white gap-[1px] hover:bg-black`}> 
            <div className="text-xl h-8 font-bold text-green-600">{workout.title}</div>
            <div className={`flex flex-row gap-2 ${TextColor}`}>
                <div className="font-bold">Load (kg):</div>
                <div>{workout.load}</div>
            </div>
            <div className={`flex flex-row gap-2 ${TextColor}`}>
                <div className="font-bold">Reps:</div>
                <div>{workout.reps}</div>
            </div>
            <div className="text-gray-500 text-sm">{workout.updatedAt}</div>
            
        </div>
    )

}

export default WorkoutDetails;