import React, { Component } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import  { useEffect } from 'react';


import Login from './components/Login';
import Home from './containers/Home';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App
