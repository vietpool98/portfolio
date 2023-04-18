import React from 'react'
import { Link, Routes, Route, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/sharegram_logo.png';
//import { categories } from '../utils/data';

const isNotActiveStyle = 'relative flex right-2 items-center px-7 gap-3 text-gray-500  hover:text-black transition-all duration-400 ease-in-out ';
const isActiveStyle = 'relative  right-2 overflow-hidden flex items-center  px-7 gap-3 text-white   rounded-lg bg-red-500 transition-all duration-400 ease-in-out  ';
const categories = [
  {name:'Animals'},
  {name:'Wallpapers'},
  {name:'Photography'},
  {name:'Gaming'},
  {name:'Coding'},
]
const Sidebar = ( {closeToggle,user}) => {

  const handleCloseSideBar = () => {
    if (closeToggle)  closeToggle(false);
  } 

  return (
    <div className='flex flex-col h-full bg-white hide-scrollbar min-w-230 overflow-y-scroll '>
      <div className='absolute flex flex-col '>
        <Link
          to="/"
          className='flex  px-5  my-6 pt-1 w-190 items-center  gap-2 '
          onClick={()=> handleCloseSideBar()}
        >
          <img src={logo} alt="logo" className='w-full '/>
        </Link>
        

        <div className='flex flex-col gap-5 w-full mt-4 '>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={()=> handleCloseSideBar()}
            >
              <RiHomeFill />
              Home
            </NavLink>
        

            <h3 className='mt-5 px-5 flex items-center 2xl:text-xl text-base'>Discover categories</h3>
            
            
            {categories.slice(0,categories.length-1).map((category)=> (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                onClick={()=> handleCloseSideBar()}
                key = {uuidv4()}
              >
                {category.name}
              </NavLink>
            ))}

            { user && (
              <NavLink
              toto={`/user-profil/${user._id}`}
              className="fixed bottom-0 gap-2 mx-1 mb-2 text-xs p-2 items-center justify-center bg-white rounded-lg shadow-lg  flex flex-row"
              onClick={()=> handleCloseSideBar()}
              >
                <img src={user?.image} alt="logo" className='w-7 rounded-full ml-2' />
                {user.userName}
              </NavLink>
            ) }
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar
