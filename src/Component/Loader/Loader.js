import React from 'react'
import loderImage from '../../Assets/output-onlinegiftools.gif'

function Loader() {
  return (
    <div className='absolute z-10 w-full h-full bg-[#F2F4F7]'>
        <div className='loderContainer absolute top-[5vw] left-[5vw]'>
           <img src={loderImage} alt='Loder' className="loderImage"/> 
        </div>
      </div>
  )
}

export default Loader