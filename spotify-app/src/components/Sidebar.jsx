import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import { logoSpotify, links } from '../assets';


const Sidebar = () => {
    console.log(links)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return(

      <>
      <div className="relative md:flex flex-col h-screen w-72  bg-black  p-4 hidden z-10">
        <div className='flex flex-col relative w-full items-center '>
          <img src={logoSpotify} alt="" className='w-48 ' />
        </div>

         <div className='relative flex flex-col w-full mt-10 '>
            {links?.map((link) => (
              <NavLink className='relative flex flex-row gap-2 mt-8 px-5 text-xl font-bold items-center' key={link.name} to={link.to}>
                <div>
                <link.icon/>
                </div>

                <div>
                {link.name}
                </div>
                
              </NavLink>)
             )}
        </div> 
      </div>


      <div className="absolute md:hidden block top-6 right-3 z-10">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white  cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>


      <div className={`absolute top-0 h-screen w-72 bg-gradient-to-tl from-white/10 to-[#483D8B]  z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logoSpotify} alt="logo" className="w-full h-14 object-contain" />
        <div className='relative flex flex-col w-full mt-10 '>
            {links?.map((link) => (
              <NavLink className='relative flex flex-row gap-2 mt-8 px-5 text-xl font-bold items-center' key={link.name} to={link.to}>
                <div>
                <link.icon/>
                </div>

                <div>
                {link.name}
                </div>
                
              </NavLink>)
             )}
        </div> 
      </div>
      </> 
    );
    
    
    
  
};

export default Sidebar;
