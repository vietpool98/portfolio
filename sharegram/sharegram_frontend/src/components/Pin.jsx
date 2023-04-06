
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client, urlFor } from '../client';


const Pin = ({pin}) => {

 const {image, postedBy,save} = pin
  return (
    <div>
      <img src={pin.image.asset.url} alt="image" className='rounded-lg w-full'/>
      {console.log(pin.image)}
    </div>
  )
}

export default Pin