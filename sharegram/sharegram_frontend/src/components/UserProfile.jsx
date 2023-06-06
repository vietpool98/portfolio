
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { searchPinSaved,userQuery ,searchPinCreated} from '../utils/data';
import { AiOutlineLogout } from 'react-icons/ai';
import { googleLogout } from '@react-oauth/google';

const UserProfile = () => {

  const isNotActiveStyle = ' rounded-full p-2 font-bold    transition-all duration-100 ease-in-out ';
  const isActiveStyle = 'bg-red-400 rounded-full p-2 font-bold text-white   transition-all duration-100 ease-in-out  ';


  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [classButtonSaved, setclassButtonSaved] = useState(isActiveStyle);
  const [classButtonCreated, setclassButtonCreated] = useState(isNotActiveStyle);
  const {userId} = useParams();
  const[getBackground, setGetBackground] = useState("hello")
 
  const fetchingPinSaved = () => {
    if(userId){
      
      const query = searchPinSaved(userId)
      client.fetch(query)
      .then((data) => {
       
        setPins(data)
      })
      .catch((err) =>{
        console.log(err)
      })
    }
  }

  const fetchingPinCreated = () => {
    if(userId){
      
      const query = searchPinCreated(userId)
      client.fetch(query)
      .then((data) => {
        
        setPins(data)
      })
      .catch((err) =>{
        console.log(err)
      })
    }
  }
  
  useEffect( () =>{
    
    const query = userQuery(userId)
    fetch("https://api.pexels.com/v1/search?query=nature",{
      headers: {
        Authorization: "k9zB5d1P9stSrpwOcX7ZjxfMbkBI0fdhnnL879GJaRE73KSwjpBdTRsS"
      }
    })
      .then(resp => {
        return resp.json()
      })
      .then(data => {
        
        setGetBackground(data.photos[getRandomInt(15)].src.original)
       
      })
      .catch((err) =>{
        console.log(err)
      })

    client.fetch(query)
    .then((data) => {
      
      setUser(data[0]);
    })
    .catch((err) =>{
      console.log(err)
    })
    
  },[userId]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  


  if(!user){
    return <Spinner message="Loading profile"/>
  }
  return (
    <div className='w-full h-full p-5 relative items-center   '>
          <div className='  w-full   relative flex flex-col'>

              <div className='  w-full   relative '>
                  <img src={getBackground} alt="" className='object-cover w-full lg:h-370 h-300 shadow-lg' /> 
                  <Link to={`/login`}>
                    <button className='absolute top-0 right-0 bg-red-400 m-5 p-2 rounded-full' onClick={()=>{localStorage.clear();googleLogout()}}>
                    <AiOutlineLogout fontSize={20} className=''/> 
                    </button> 
                  </Link>
                   
                  <div className='w-full  flex justify-center relative bottom-7'>
                      <img src={user?.image} alt="logo"  className=' w-50 rounded-full relative shadow-lg' />
                      
                  </div>
              </div>
              <div className='w-full   relative text-3xl font-bold flex justify-center mb-5'>
                  <h2>{user.userName}</h2>
              </div>
              <div className='w-full   relative  flex justify-center flex-row gap-6'>
                  <button className={classButtonSaved} onClick={()=>{setclassButtonSaved(isActiveStyle); setclassButtonCreated(isNotActiveStyle)}}>Saved</button>
                  <button className={classButtonCreated} onClick={()=>{setclassButtonSaved(isNotActiveStyle); setclassButtonCreated(isActiveStyle)}}>Created</button>
              </div>
             {classButtonSaved == isActiveStyle ?(
              
              <div className='mt-5'>
                {fetchingPinSaved()}
                
                {pins?.length ? (<MasonryLayout pins={pins}/>) : (<div><p>no Pins found!</p></div>)}
              </div>  )
              :(
              <div className='mt-5'>
                {fetchingPinCreated()}
                {pins?.length ? (<MasonryLayout pins={pins}/>) : (<div><p>no Pins found!</p></div>)}
              </div>
            )

            } 
          </div>
        
    </div>

  )
}

export default UserProfile
