import React from 'react'
import MovieCard from './MovieCard'


const MovieList = ({ title, moviesNow }) => {
  // if(!moviesNow) return;
  return (
    <div className='px-6'>
    <h1 className='text-lg md:text-3xl py-2 text-white'>{title}</h1>
      <div className='flex overflow-x-scroll scrollbar-hide'>
        <div className='flex'>
          {moviesNow?.map(movie => <MovieCard 
          key={movie.id} 
          id={movie.id}
          movieTitle={movie.title} 
          posterPath={movie.poster_path}
          overview={movie.overview} />)}
          {/* its not movie[0].poster_path */}
        </div>
      </div>
    </div>
  )
}

export default MovieList