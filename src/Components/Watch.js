import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import VideoBackground from './VideoBackground';
const Watch = () => {
  const {id} = useParams();
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/browse')
  }
  return (
    <>
      <div className='bg-black h-screen object-cover flex flex-col flex-wrap justify-center md:h-auto'>
        WatchId: {id}
        <div>
          <VideoBackground movieId={id} />
          <button className='text-white font-bold bg-red-500 py-1 px-3 md:py-4 md:px-3 w-36 m-4 hover:bg-opacity-80 rounded-lg'>Subscribe Now</button>
          <button className='text-white font-bold bg-red-500 py-1 px-3 md:py-4 md:px-3 w-36 m-4 hover:bg-opacity-80 rounded-lg' onClick={handleHome}>Homepage</button>
        </div>
      </div>
    </>
  )
}

export default Watch