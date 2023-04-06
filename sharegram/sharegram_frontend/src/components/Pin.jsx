
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client, urlFor } from '../client';


const Pin = ({pin}) => {

 const {image, postedBy,save} = pin
 const [onImageHover, setOnImageHover] = useState(false);
 const navigate = useNavigate();
 
  return (
    <div className='m-2 '>
      <div
        onMouseEnter={()=> setOnImageHover(true)}
        onMouseLeave={()=> setOnImageHover(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className='relative  w-auto h-auto cursor-zoom-in hover:shadow-lg rounded-lg '
      >
        <img src={image.asset.url} alt="image" className='rounded-lg w-full'/> 

        {onImageHover && 
          <a 
            href={`${image.asset.url}`}
            download
            onClick={(e)=>e.stopPropagation()}
            className='absolute top-0 m-2 bg-white p-1 rounded-full opacity-60 hover:opacity-100'
          >
            <MdDownloadForOffline fontSize={20} className=''/>
          </a>
        }

      </div>
       
      
    </div>
  )
}

export default Pin