import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    const popularMovies = useSelector((store) => store.movies?.popularVideos);
    const topRated = useSelector((store) => store.movies?.topRatedMovies);
    const upcoming = useSelector((store) => store.movies?.upcomingMovies);

    console.log(popularMovies)
    // if(!movies) return;

    console.log(movies)
    return (
        <div className='bg-black'>
            <div className='mt-0 pl-4 md:pl-12 md:-mt-52 relative z-20'>
                <MovieList title={"Now Playing"} moviesNow={movies} />
                <MovieList title={"Top Rated"} moviesNow={topRated} />
                <MovieList title={"Popular"} moviesNow={popularMovies} />
                <MovieList title={"Upcoming"} moviesNow={upcoming} />

            </div>  
        </div>
  )
}

export default SecondaryContainer