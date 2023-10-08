import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
        <p className='text-6xl font-bold'>{title}</p>
        <p className='text-lg w-1/2 py-6 my-2'>{overview}</p>
        <div className='my-2'>
            <button className='text-black bg-white p-3 w-36 hover:bg-opacity-80 rounded-lg'>Play</button>
            <button className='text-white mx-2 p-3 w-36 bg-gray-500 rounded-lg opacity-50'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;