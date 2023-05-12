
import React, { useState,useEffect,useReducer } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client, urlFor } from '../client';

import { MdFavorite } from 'react-icons/md';
import { saveAs } from 'file-saver'
import { pinDetailQuery } from '../utils/data';


const Pin = ({pin}) => {

 const {image, postedBy,save,title} = pin
 const [onImageHover, setOnImageHover] = useState(false);
 const [savingPost, setSavingPost] = useState(false);
 const [counter, setCounter] = useState(0);
 const navigate = useNavigate();
 const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
 const location = useLocation();
 const [alreadySaved, setAlreadySaved] = useState([]);
 
 


 const [numberlike, setNumberlike] = useState(pin.save?.length);
 
  
  
   function pinDelete (id){
    client.delete({
              query : `*[_type == "pin" && _id == '${id}']`
            })
            .then(() => {
              window.location.reload();
            })
   }

   const downloadImage = (imgUrl, imgName) => {
    saveAs(imgUrl, `${imgName}.jpg`) // Put your image url here.
  }

  const fetchSaveData = () => {
    const query = pinDetailQuery(pin._id)
           client.fetch(query)
           .then((data) => {
              setNumberlike(data[0].save.length)
              setAlreadySaved (data[0].save.filter((name) => name.postedBy._id == userInfo.data.sub))
               console.log (alreadySaved)
            
           })
  }

  useEffect(() => {
    setAlreadySaved(pin.save?.filter((name) => name.postedBy._id == userInfo.data.sub) ? pin.save?.filter((name) => name.postedBy._id == userInfo.data.sub) : [])
  },[]);
  
 
   function savePin (id) {
      if (alreadySaved?.length === 0) {
        setSavingPost(true);

        client
          .patch(id)
          .setIfMissing({ save: [] })
          .insert('after', 'save[-1]', [{
            _key: uuidv4(),
            userId: userInfo?.data.sub,
            postedBy: {
              _type: 'postedBy',
              _ref: userInfo?.data.sub,
            },
          }])
          .commit()
          .then(() => {
            fetchSaveData()
          })
      }
    }
 
  return (
    
    <div className='relative m-2 z-0 '>
      
      <div
        onMouseEnter={()=> {setOnImageHover(true);
                             }}
        onMouseLeave={()=> setOnImageHover(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className='relative  w-auto h-auto cursor-zoom-in hover:shadow-lg rounded-lg '
      >
        <img src={image.asset.url} alt="image" className='rounded-lg w-full'/> 
        <div className=' absolute w-full h-full hover:bg-blackOverlayPin top-0 rounded-t-lg transition duration-250 ease-in-out'></div>
        {onImageHover && 
          <div> 
            <button 
              
              onClick={(e)=>{e.stopPropagation();
                              downloadImage(image.asset.url,title);
                              console.log(pin)
              }}
              className='absolute top-0 m-2  bg-white p-1 rounded-full opacity-60 hover:opacity-100'
            >
              <MdDownloadForOffline fontSize={20} className=''/>
            </button>

            {alreadySaved?.length > 0 ?
              (<button
                className='absolute gap-1 flex flex-row items-center justify-center top-0 right-0  bg-red-500 m-2 p-1 rounded-full opacity-60 hover:opacity-100'
                onClick={(e) => e.stopPropagation()}
              >
                <span className='text-white'>{numberlike} </span>
                <MdFavorite fontSize={20} color={"white"} className=''/>
              </button>)
              :(
              <button
               className='absolute gap-1 flex flex-row items-center justify-center top-0 right-0  bg-red-500 m-2 p-1 rounded-full opacity-60 hover:opacity-100'
               onClick={(e) => {e.stopPropagation();
                                savePin(pin._id);
                               }}
              >
                {  numberlike > 0 && <span >{numberlike} </span>}
                <MdFavorite fontSize={20}  className=''/>
              </button>
              )}

              <div className='absolute  flex flex-row items-center justify-center bottom-0 left-0  bg-white m-2 p-1 rounded-full opacity-60 hover:opacity-100'>
                {pin.destination.length > 8 ?
                <a href={pin.destination}
                 className='flex flex row items-center justify-center gap-2'
                >
                  <BsFillArrowUpRightCircleFill fontSize={20} />
                  <span>{pin.destination.slice(8,16)}</span>
                </a>
                : undefined
              }
              </div>

              {pin.postedBy?._id === userInfo.data.sub  &&
                <button 
                onClick={(e)=> {e.stopPropagation();
                               pinDelete(pin._id);
                              }}
                className='absolute  flex flex-row items-center justify-center bottom-0 right-0  bg-white m-2 p-1 rounded-full opacity-60 hover:opacity-100'>
                  <AiTwotoneDelete fontSize={20} />
                </button> 
              }
              
          </div>
        }
        
      </div>
      <div className='flex flex-row items-center gap-2 text-sm'>
        
        <img src={pin.postedBy.image} alt="image"  className='w-8 rounded-full mt-1 '/> 
        <span>{pin.postedBy?.userName}</span>
      </div>
    </div>
  )
}

export default Pin