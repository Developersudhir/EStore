import React from 'react'
import './loader.css'
import LoaderImage from './Skateboarding_Loader.gif'

const Loader = () => {
  return (
    <div className='Loader'>
        <div className='loaderimg'>
            <img src={LoaderImage} alt="" />
        </div>
    </div>
  )
}

export default Loader