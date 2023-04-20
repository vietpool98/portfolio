
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client, urlFor } from '../client';
import { updateSave } from '../utils/data';
import { MdFavorite } from 'react-icons/md';



const Pin = ({pin}) => {

 const {image, postedBy,save} = pin
 const [onImageHover, setOnImageHover] = useState(false);
 const [savingPost, setSavingPost] = useState(false);
 const navigate = useNavigate();
 const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

 let alreadySaved =  pin.save?.filter((name) => name.postedBy._id == userInfo.data.sub);
 alreadySaved = alreadySaved?.length > 0 ? alreadySaved :  [];
 
   function pinDelete (id){
    client.delete({
              query : `*[_type == "pin" && _id == '${id}']`
            })
            .then(() => {
              window.location.reload();
            })
   }
 
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
          window.location.reload();
        })
        
    }
  
};
 
  return (
    
    <div className='m-2 '>
      
      <div
        onMouseEnter={()=> {setOnImageHover(true);
                             }}
        onMouseLeave={()=> setOnImageHover(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className='relative  w-auto h-auto cursor-zoom-in hover:shadow-lg rounded-lg '
      >
        <img src={image.asset.url} alt="image" className='rounded-lg w-full'/> 

        {onImageHover && 
          <div> 
            <a 
              href={`${image.asset.url}`}
              download
              onClick={(e)=>e.stopPropagation()}
              className='absolute top-0 m-2  bg-white p-1 rounded-full opacity-60 hover:opacity-100'
            >
              <MdDownloadForOffline fontSize={20} className=''/>
            </a>

            {alreadySaved?.length > 0 ?
              (<button
                className='absolute gap-2 flex flex-row items-center justify-center top-0 right-0  bg-red-500 m-2 p-1 rounded-full opacity-60 hover:opacity-100'
                onClick={(e) => e.stopPropagation()}
              >
                <span>{pin.save?.length} </span>
                <MdFavorite fontSize={20} className=''/>
              </button>)
              :(
              <button
               className='absolute gap-2 flex flex-row items-center justify-center top-0 right-0  bg-red-500 m-2 p-1 rounded-full opacity-60 hover:opacity-100'
               onClick={(e) => {e.stopPropagation();
                                savePin(pin._id);
                               }}
              >
                <span>{pin.save?.length} </span>
                <MdFavorite fontSize={20} className=''/>
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

              {pin.postedBy?._id == userInfo.data.sub  &&
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