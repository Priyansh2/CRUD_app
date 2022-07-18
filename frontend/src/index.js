import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './componenets/Login/Login';
import Header from './componenets/Registration/header';
import RegistrationForm from './componenets/Registration/registrationForm';
import Dashboard from './componenets/Dashboard/Dashboard';
import Preferences from './componenets/Preferences/Preferences';
import AddTask from './componenets/AddTask/addtask';
import EditTask from './componenets/EditTask/edittask';
import SearchBar from './componenets/SearchBar/searchbar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />}/>
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/preferences" element={<Preferences />}/>
    <Route path="/registration" element={[<Header />,<RegistrationForm />]}/>
    <Route path='/addtask' element={<AddTask />}/>
    <Route path='/edittask' element={<EditTask />}/>
    <Route path='/searchbar' element={<SearchBar />}/>

  </Routes>
</BrowserRouter>
  
);
