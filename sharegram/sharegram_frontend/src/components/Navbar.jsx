import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate, Route } from 'react-router-dom';
import {IoMdAdd, IoMdSearch} from 'react-icons/io'
import CreatePin from './CreatePin';

const Navbar = ({searchTerm, setSearchTerm, user}) => {

  const navigate = useNavigate();
  const [itemSearch, setItemSearch] = useState(''); 
  
  if(!user){return null}
   return (
    <div className='flex w-full  pt-5 pb-5 items-center justify-between'>
      <div className='flex  flex-row items-center justify-center w-3/4  rounded-md mx-5'>
        
          <IoMdSearch fontSize={21}/>
        
        
        <input
          type="text"
          placeholder='Search'
          className='w-full p-1  rounded-lg outline-none'
          onFocus={() => navigate('/search')}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      <div className='hidden md:flex mr-5 flex-row  pr-5 pl-5 items-center  gap-5'>
        <Link to={`user-profil/${user?._id}`}>
            <img src={user?.image} alt="logo"  className='w-14 rounded-full ' />
        </Link>
        <Link to="/create-pin" className="bg-black text-white rounded-lg w-10 h-12 flex justify-center items-center">
            <IoMdAdd />
        </Link>
      </div>
    </div>
  )
}

export default Navbar