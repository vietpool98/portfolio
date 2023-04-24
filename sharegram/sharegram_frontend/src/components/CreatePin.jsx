
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdCategory, MdDelete } from "react-icons/md";
import { client, urlFor } from '../client';
import { categories } from '../utils/data';
import { AiTwotoneDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

const CreatePin = ({user}) => {

   const navigate = useNavigate();
   const [imagesAssets, setImagesAssets] = useState(null);
   const [wrongTypeofImage, setWrongTypeofImage] = useState(false);
   const [field, setField] = useState(true);
   const [onImageHover, setOnImageHover] = useState(false);
   const [imageTitle, setImageTitle] = useState(null);
   const [imageAbout, setImageAbout] = useState(null);
   const [imageDestination, setImageDestination] = useState(null);
   const [imageCategory, setImageCategory] = useState();
   

   

   const uploadImage = (e) => {
       const selectedImage = e.target.files[0];
       //to input an image to the upload field
      if (selectedImage.type === 'image/png' ||
       selectedImage.type === 'image/svg' ||
       selectedImage.type === 'image/jpeg' 
       ) {
           setWrongTypeofImage(false);

             client.assets
             .upload('image', selectedImage, { contentType: selectedImage.type, filename: selectedImage.name })
             .then((document) => {
              
               setImagesAssets(document);

             })
             .catch((error) => {
               console.log('Upload failed:', error.message);
             });
         } else {
           setWrongTypeofImage(true);
           console.log("wrong")
         }
     }

   const saveImage = (imageAbout,imageCategory,imageDestination,imageTitle,imagesAssets) => {
    if(imageAbout && imageCategory && imageDestination && imageTitle && imagesAssets){
      setField(true)
      const doc = {
        _type : "pin",
        title: imageTitle,
        about: imageAbout,
        destination : imageDestination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imagesAssets?._id,
          },
        },
        userID : user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category : imageCategory
      }

      client.create(doc)
        .then(() => navigate("/"));
    }
    else{
      setField(false)
    }
    
   }
  
  return(
        <div className="flex flex-col relative h-full w-full   items-center ">
          <div className="w-656  h-2/5  bg-gray-100 flex flex-col justify-center items-center rounded-lg border-gray-200  border-2 shadow-md text-sm">
            {!imagesAssets ?
              (
                <div className="w-1/3 h-1/3 justify-center items-center rounded-lg flex flex-col border-gray-300 border-2 border-dashed cursor-pointer">
                  {!wrongTypeofImage ? 
                  (<label 
                    for="upload-image"
                    onClick={()=> uploadImage}    
                    className="w-full h-full justify-center items-center rounded-lg flex flex-col cursor-pointer">
                    <AiOutlineCloudUpload fontSize={30} className=''/>
                    
                    <input
                        type="file"
                        placeholder="hello"
                        name="upload-image"
                        id="upload-image"
                        onChange={(e)=>uploadImage(e)}
                        className="w-0 h-0 "
                      />
                      <span> upload your image</span>
                    </label>)
                    : (
                      <div className="flex items-center justify-center flex-col">

                          <h1 className="text-center text-red-500 text-sm m-2">image type not correct, only allowed svg png or jpeg type</h1>
                          <button 
                            onClick={()=>setWrongTypeofImage(false)}
                            className="relative  bg-red-400 p-1 rounded-full shadow-md text-white capitalize"
                            >retry</button>
                      </div>
                      )
                  }
                </div>)
              :( 

              <div 
                onMouseEnter={()=> setOnImageHover(true)}
                onMouseLeave={()=> setOnImageHover(false)}
                className=" h-full w-1/2   flex justify-center  items-center flex-col m-1"
              >
                
                <div className=" relative h-2/3 bg-red-500">
                  <img
                    src={imagesAssets.url}
                    className=" object-cover h-full rounded-md "
                  />
                  {onImageHover &&
                    <button 
                    className="absolute flex items-center justify-center left-0 top-0 bg-white m-1 p-1 rounded-full opacity-60 hover:opacity-100"
                    onClick={()=>setImagesAssets(null)}
                    >
                      <AiTwotoneDelete fontSize={20} className=''/>
                    </button>
                  }
                </div>
                  
                  <button
                  className=" relative top-3 bg-red-400 p-3 rounded-full shadow-md text-white capitalize"
                  onClick={() => saveImage(imageAbout,imageCategory,imageDestination,imageTitle,imagesAssets)}
                  >
                    publish
                  </button>
              </div>
            )}
          </div>
          <form className="relative w-350 ">
              <input type="text" placeholder="Tape your title here"  onChange={(e)=> {setImageTitle(e.target.value)}} className="relative top-5 outline-none text-base sm:text-lg border-2 border-gray-200 p-2 w-full"/>
              <input type="text" placeholder="What's your pin about" onChange={(e)=> setImageAbout(e.target.value)} className="relative top-5 outline-none text-base sm:text-lg border-2 border-gray-200 p-2 w-full"/>
              <input type="text" placeholder="Add a link (optional)"  onChange={(e)=> setImageDestination(e.target.value)} className="relative top-5 outline-none text-base sm:text-lg border-2 border-gray-200 p-2 w-full"/>

               <select  
                  onChange={(e) => {
                    setImageCategory(e.target.value);
                  }}
                  className="relative top-5 outline-none text-base sm:text-lg border-2 border-gray-200 p-2 w-full"
                >
                <option value="others">-- Select a category --</option>
                  {categories.map((category)=> (
                      <option   value={category.name}>{category.name}
                      </option>
                  ))}
              </select> 

               {!field &&
                <div className="relative top-10 p-2 w-full text-red-500 text-center border-2 border-red-500 bg-red-200 items-center justify-center flex rounded-lg">
                  <span>
                     All the fields are required, we can't publish your image yet.
                  </span>
                </div>
               }
            </form>
        </div>
  );
  
}

export default CreatePin