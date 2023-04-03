import React from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/sharegram_logo.png';
import { categories } from '../utils/data';

const Sidebar = ( {closeToggle,user}) => {

  const handleCloseSideBar = () => {
    if (closeToggle)  closeToggle(false);
  } 

  return (
    <div className='flex flex-row h-full bg-white hide-scrollbar min-w-210 overflow-y-scroll'>
      <div className='absolute flex flex-col '>
        <Link
          to="/"
          className='flex  px-5  my-6 pt-1 w-190 items-center gap-2'
          onClick={()=> {console.log('hello')}}
        >
          <img src={logo} alt="logo" className='w-full '/>
        </Link>
        

        <div className='flex flex-col '>

        </div>
      </div>
    </div>
  )
}

export default Sidebar
