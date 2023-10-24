import Header from "./Header";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularVideos from "../Hooks/usePopularVideos";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
    useNowPlayingMovies();
    usePopularVideos();//these hooks are called here & the store gets updated 
    useTopRatedMovies();
    useUpcomingMovies();
    const gpt = useSelector(store =>store.gpt.showGptSearch)
    return(
        <div>
            <Header />
            {gpt ? (<GptSearch />) : 
            <>
                <MainContainer />
                <SecondaryContainer />
            </>}  
        </div>
    );
    
};

export default Browse;