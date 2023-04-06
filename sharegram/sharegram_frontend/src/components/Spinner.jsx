import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {ColorRing} from 'react-loader-spinner'


const Spinner = ({message}) => {
    return (
      <div className='flex flex-col w-full items-center justify-center'>
        <ColorRing
          visible={true}
          height="50"
          width="50"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />

        <div>
          <span className=''>{message}</span>
        </div>
      </div>
      
    )
  }
  
  export default Spinner