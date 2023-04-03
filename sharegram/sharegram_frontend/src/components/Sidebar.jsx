import React from 'react'
import { Link, Routes, Route, NavLink } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/sharegram_logo.png';
//import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500  hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center  px-5 gap-3 text-white font-extrabold  rounded-lg bg-gray-500 transition-all duration-200 ease-in-out capitalize ';
const categories = [
  {name:'animals'},
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
    <div className='flex flex-row h-full bg-white hide-scrollbar min-w-210 overflow-y-scroll '>
      <div className='absolute flex flex-col    '>
        <Link
          to="/"
          className='flex  px-5  my-6 pt-1 w-190 items-center  gap-2 '
          onClick={()=> handleCloseSideBar()}
        >
          <img src={logo} alt="logo" className='w-full '/>
        </Link>
        

        <div className='flex flex-col gap-5 w-full '>
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
              >
                {category.name}
              </NavLink>
            ))}
            { user && (
              <NavLink
              toto={`/user-profil/${user._id}`}
              className="fixed bottom-0 gap-2 mx-1 mb-2 items-center bg-white rounded-lg shadow-lg  flex flex-row"
              onClick={()=> handleCloseSideBar()}
              >
                <img src={user?.image} alt="logo" className='w-8 rounded-full ml-2' />
                {user.userName}
              </NavLink>
            ) }
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar
