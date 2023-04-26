
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
  const scrollRef = useRef(null);

  useEffect( () =>{
    const query = userQuery(userInfo?.data?.sub)
    client.fetch(query)
    .then((data) => {
      console.log(data);
      setUser(data[0]);
    })
    
  },[]);
  return (
    <div className=" flex bg-gray-50  md:flex-row flex-col h-screen ease-out transition-height duration-75">
      <div className='hidden  md:flex h-screen  flex-initial bg-black '>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row  '>
        <div className='w-full flex flex-rox justify-between items-center p-3 shadow-md'>
          <HiMenu fontSize={35} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className='w-32' />
          </Link>
          <Link to={`user-profil/${user?._id}`}>
            <img src={user?.image} alt="logo" referrerPolicy="no-referrer" className='w-10 rounded-full ml-2' />
          </Link>
        </div>
        
        {toggleSidebar && (
          <div className="absolute top-0 w-4/5 bg-white h-screen  overflow-y-auto shadow-md  animate-slide-in ">
            <div className="absolute w-full h-full flex justify-end  p-2 z-0 ">
              <AiFillCloseCircle fontSize={40} className="cursor-pointer  bg-white " onClick={() => setToggleSidebar(false)} />
            </div>
               <Sidebar closeToggle={setToggleSidebar} user={user && user} /> 
              
          </div>
        )
        }
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>

    </div>
  )
}

export default Home
