import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useParams,Link} from 'react-router-dom';
import { categories } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';
import { pinDetailQuery,searchSimilarCategory } from '../utils/data';
import { client, urlFor } from '../client';
import Spinner from './Spinner';
import { MdDownloadForOffline } from 'react-icons/md';
import { saveAs } from 'file-saver'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import MasonryLayout from './MasonryLayout';


const PinDetail = ({user}) => {

  const [imageCategory, setImageCategory] = useState();
  const {pinId} = useParams();
  const[pins, setPins] = useState(); 
  const[loading, setLoading] = useState(false);
  const[comment, setComment] = useState('')
  const[addComment, setAddComment] = useState(true)

  const {categoryId} = useParams()
  const[loadingbis, setLoadingBis] = useState(false);
  const[pinsBis, setPinsBis] = useState();

 
  

  const downloadImage = (imgUrl, imgName) => {
    saveAs(imgUrl, `${imgName}.jpg`) // Put your image url here.
  }

  const fetchingPinData = () => {
    if(pinId){
      setLoading(true)
      const query = pinDetailQuery(pinId)
      client.fetch(query)
      .then((data) => {
        setPins(data[0]);
        setLoading(false)

            const query = searchSimilarCategory(data[0]?.category)
            client.fetch(query)
            .then((data) => {
              setPinsBis(data);
              setLoadingBis(false);
              console.log(pinsBis)
            })
            .catch((err) =>{
              console.log(err)
            })
      })
      .catch((err) =>{
        console.log(err)
      })
    }
  }

  useEffect(() => {
    fetchingPinData();
  }, [pinId]);
    
  function senComment (id){
      client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          _key: uuidv4(),
          comment,
          postedBy: {
            _type: 'postedBy',
            _ref: user?._id,
          },
        }])
        .commit()
        .then(() => {
          fetchingPinData();
          
        })
  
  }
 
  
    if(loading) return <Spinner message="We are adding some new content in your feed"/>
    return (
      <div className='w-full h-full flex relative flex-col '>

        <div className='flex justify-center w-full h-2/3 relative '>
          <div className='w-508 h-full relative'>
            <img src={pins && urlFor(pins.image)} className='object-cover w-508 h-full rounded-t-lg'/> 

            <div className=' absolute w-full h-full hover:bg-blackOverlayPin top-0 rounded-t-lg transition duration-250 ease-in-out'></div>
            <div className='absolute  p-2 justify-center bottom-0 left-0 flex flex-row items-center gap-2 text-sm text-white opacity-85 '>
                <img src={pins?.postedBy.image} alt="image"  className='w-8 rounded-full mt-1 opacity-75 '/> 
                <span>{pins?.postedBy?.userName}</span>
            </div>
          </div>
        </div>

        <div className='flex justify-center w-full relative '>
          <div className='flex items-center w-508 p-2 bg-white rounded-b-lg border-b-2 justify-between flex-row shadow-lg '>
            <button 
              
              onClick={(e)=>{e.stopPropagation();
                              downloadImage(pins.image.asset.url,pins?.title);
                            
              }}
              className=' bg-white rounded-full opacity-60 hover:opacity-100'
            >
              <MdDownloadForOffline fontSize={20} className=''/>
            </button>

            { pins?.destination &&
            
            <a href={pins.destination}
                  className='flex items-center gap-1 opacity-60 hover:opacity-100'
                >
                  <BsFillArrowUpRightCircleFill fontSize={20} />
                  <span>{pins.destination.slice(8,16)}</span>
              </a> }
          </div>
        </div>

        <div className='flex justify-center w-full relative mt-5 '>
          <div className='flex items-center w-508 p-2 justify-between text-4xl font-bold border-b-2 border-t-2'>
              <h2>{pins?.title}</h2>
          </div>
        </div>

        <div className='flex justify-center w-full relative  '>
          <div className='flex items-center w-508 p-2 justify-between border-b-2 '>
              <h2>{pins?.about}</h2>
          </div>
        </div>

       

        <div className='flex justify-center w-full relative  '>
          <div className='flex items-center w-508 p-2 justify-between text-2xl  font-bold text-red-400'>
              <span>Comments</span>
          </div>
        </div>

        {pins?.comments && 
          pins.comments.map((item) => (
            <div className="flex  items-center  rounded-lg w-full justify-center" key={item.comment}>
              <div className='flex items-center w-508 bg-white gap-2 mt-5'>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>

                  </div>
              </div>
            </div>
          ))
        }

        <div className='flex justify-center w-full relative  '>
          <div className='flex items-center w-508 p-2 gap-2   text-bold flex-row'>
            <Link to={`user-profil/${user?._id}`}>
              <img src={user?.image} alt="logo" referrerPolicy="no-referrer" className='w-10 rounded-full' />
            </Link>
            <input 
              type="text" 
              placeholder='add a comment'
              className='border-gray-100 border-2 outline-none p-2 rounded-full w-full focus:border-gray-300 ' 
              onChange={(e) => {
                                  setComment(e.target.value);
                                  setAddComment(true)
                                }}
            />

            <button
              onClick={()=> {(comment && setAddComment(false));
                              senComment(pins._id)}}
              className='p-2 bg-red-500 opacity-50 hover:opacity-75 rounded-full text-white text-bold'
            >
              {addComment ? <p>Post</p> : <p>Posted</p>}
            </button>
          </div>
        </div>

        <div className='flex w-full relative justify-center  mt-20  '>
          <h2 className='font-bold text-4xl text-red-400 border-b-2 border-red-400'>
            Similar media
          </h2>
        </div>  
        <div className='mt-5'>
            {pins && (<MasonryLayout pins={pinsBis}/>)}
        </div>     

      </div>
    )
  }
  
  export default PinDetail