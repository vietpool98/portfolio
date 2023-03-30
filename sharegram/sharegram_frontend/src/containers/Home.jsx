
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Routes, Route } from 'react-router-dom';
import { client } from '../client';

import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import logo from '../assets/sharegram_logo.png';
import Pins from './Pins';
import { userQuery } from '../utils/data';

const Home = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  console.log(userInfo.data.sub)
  useEffect( () =>{
    const query = userQuery(userInfo?.data?.sub)

    client.fetch(query)
    .then((data) => {
      setUser(data[0]);
    })
  }, [] );
  return (
    <div className=" flex bg-gray-50  md:flex-row flex-col h-screen ease-out transition-height duration-75">
      <div className='hidden bg-gray-500 md:flex h-screen flex-initial '>
        <Sidebar/>
      </div>
      <div className='flex md:hidden flex-row items-center '>
        <HiMenu fontSize={35} className='cursor-ponter' onClick={() => setToggleSidebar(true)} />
        <Link to="/">
          <img src={logo} alt="logo" className='w-32' />
        </Link>
        <Link to={`user-profil/${user?._id}`}>
          <img src={logo} alt="logo" className='w-32' />
        </Link>
        
      </div>
    </div>
  )
}

export default Home
