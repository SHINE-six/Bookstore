import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Components from './Components/index.js';

const App = () => {

  return (
    <BrowserRouter>
      <div className='flex flex-col w-screen bg-gray-200'>
        <NavBar />
        <Routes>
          <Route path ="/" element={<Components.HomePage />}/>
          <Route />
          <Route />
        </Routes>
      </div>
    </BrowserRouter>

  )

}

export default App;