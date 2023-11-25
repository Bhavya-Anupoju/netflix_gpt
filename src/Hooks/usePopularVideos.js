import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addPopularVideos } from "../Utils/moviesSlice";
import { useEffect } from "react";

const usePopularVideos = () => {
  const dispatch = useDispatch();
  const popularVideos = useSelector((store) => store.movies.popularVideos);

  const getPopularData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularVideos(json.results));
  };
  useEffect(() => {
    // calling the API here
    if (!popularVideos) getPopularData();
    // getPopularData();
  }, []);
};

export default usePopularVideos;
