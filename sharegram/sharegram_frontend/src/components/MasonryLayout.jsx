import React from 'react';
import Pin from './Pin';
import Masonry from 'react-masonry-css'


const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const MasonryLayout = ({pins}) => {
return(
  <div>
    <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
  >
    
    {pins?.map((pin)=> <Pin pin={pin} key = {pin._id} />)}
    
  </Masonry>

  
  </div>
)
  
  

};

  export default MasonryLayout