import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, moviesNow }) => {
  // if(!moviesNow) return;

  console.log(moviesNow)
  return (
    <div className='px-6'>
    <h1 className='text-3xl py-2 text-white'>{title}</h1>
      <div className='flex overflow-x-scroll'>
        <div className='flex'>
          {moviesNow?.map(movie => <MovieCard key={movie.id} posterPath={movie.poster_path}/>)}
          {/* its not movie[0].poster_path */}
        </div>
      </div>
    </div>
  )
}

export default MovieList