
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchTerms, feedQuery } from '../utils/data';
import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';


const Search = ({searchTerm}) => {

  const {categoryId} = useParams()
  const[loading, setLoading] = useState(false);
  const[pins, setPins] = useState();

  useEffect(() => {
    setLoading(true);
      if(searchTerm){
        const query = searchTerms(searchTerm)
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
      
  },[searchTerm]);

  if(loading) return <Spinner message="We are adding some new content in your feed"/>
  return (

      <div>
        {pins && (<MasonryLayout pins={pins}/>)}
      </div>
  )
}

export default Search