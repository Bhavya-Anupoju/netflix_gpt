import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants";
import { addTrailerVideo } from "../Utils/moviesSlice";

const useTrailerVideo = (movieId) => {
    const dispatch = useDispatch()

    const movieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
        const json = await data.json()

        const trailersList = json.results.filter((video) => video.type === "Trailer")
        const trailer = trailersList.length ? trailersList[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
        //we are using the power of redux, so we dont require separate state variable 
    };

    useEffect(() => {
        movieVideos();
    },[])

}

export default useTrailerVideo;