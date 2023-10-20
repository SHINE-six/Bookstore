import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <nav className='w-full h-32'>
            <div className={`flex w-full h-full items-center pl-48 bg-gray-100`}>
                <Link to="/"><div className='text-4xl text-black font-extrabold'>Workout Buddy</div></Link>
                
            </div>
        </nav>
    );
}

export default NavBar;

