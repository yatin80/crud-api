import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState } from 'react';
import UsersData from './UsersData';
import Update from './Update';
import UserIcon from './UserIcon';


function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/users' element={<UsersData />} />
          <Route path='/update' element={<Update />} />
          <Route path='/user-icon' element={<UserIcon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
