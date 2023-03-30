import React from 'react'

import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/sharegram_video.mp4';
import logo from '../assets/sharegram_white.png';
import axios from "axios"
import {client} from '../client.js'


const Login = () => {
  const navigate = useNavigate();
  const loginGoogle = useGoogleLogin
  ({
    onSuccess: async tokenResponse => {
      try{
        const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo" , 
        {
          headers: 
          {
            "Authorization": `Bearer ${tokenResponse.access_token}`
          }
        })
        
        localStorage.setItem('user', JSON.stringify(data));
        const name = data.data.name;
        const googleId = data.data.sub;
        const imageUrl = data.data.picture;
        

        const doc = {
          _id: googleId,
          _type: 'user',
          userName: name,
          image: imageUrl,
        }

         client.createIfNotExists(doc)
         .then(() => {
           navigate('/', {replace: true})
         })
      }
        catch(err){
          console.log(err)
        }
    }
  });

  return (
    
    <div className='flex items-center  flex-col h-screen '>
      <div className="relative w-full h-full "> 
        <video 
          src={shareVideo}
          type="video/mp4" 
          loop 
          autoPlay
          muted
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col bg-blackOverlay w-screen h-screen top-0 items-center justify-center'>
          <img 
            src={logo} 
            width = "250px"
          />

          <div className='shadow-2x1'>
          <button
                onClick={loginGoogle}
                type ="button" 
                className ="relative bg-mainColor flex p-3 rounded-lg items-center justify-center top-5 cursor-pointer"
              >
                <FcGoogle size={20} className='mr-4'/>sign in with google
          </button>

        </div>

        </div>

        

      </div>
    </div>
  )
}

export default Login
