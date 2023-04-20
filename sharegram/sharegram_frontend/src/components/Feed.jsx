import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchTerms, feedQuery } from '../utils/data';
import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';



const Feed = () => {

    const {categoryId} = useParams()
    const[loading, setLoading] = useState(false);
    const[pins, setPins] = useState();

    useEffect(() => {
      setLoading(true);
      
      if(categoryId){
        
        const query = searchTerms(categoryId)
        client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((err) =>{
          console.log(err)
        })
      }
      else{
        
        const query = feedQuery
        client.fetch(query)
        .then((data) => {
          {console.log(data[0].save)}
          setPins(data);
          
          setLoading(false);
        })
        .catch((err) =>{
          console.log(err)
        })
      }
    },[categoryId]);


    if(loading) return <Spinner message="We are adding some new content in your feed"/>
    return (
      <div>
        {console.log(pins)}
        {pins && (<MasonryLayout pins={pins}/>)}
      </div>
    )
  }
  
  export default Feed