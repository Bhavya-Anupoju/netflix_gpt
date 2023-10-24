import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addUpcomingMovies } from "../Utils/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {

    const dispatch = useDispatch();

    const getUpcomingData = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
        const json = await data.json();
        console.log(json)
        dispatch(addUpcomingMovies(json.results));    
    }

    useEffect(()=>{
        // calling the API here
        getUpcomingData();
    },[])

}

export default useUpcomingMovies;
