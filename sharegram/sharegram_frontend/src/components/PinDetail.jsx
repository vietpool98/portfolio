import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { categories } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';

const PinDetail = () => {

  const [imageCategory, setImageCategory] = useState();
    return (
      <div>
        <select name="categories"
                className="relative top-5 outline-none text-base sm:text-lg border-2 border-gray-200 p-2 w-full"
                  onChange={(e)=> {setImageCategory(e.target.value)}}
                >
                <option value="">--Please choose an option--</option>
                  {categories.map((category)=> (
                      <option key={uuidv4()} value={category.name}>{category.name}</option>
                  ))}
                  
                 
              </select>
      </div>
    )
  }
  
  export default PinDetail