import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name : "Movies",
    initialState: {
        nowPlayingMovies : null,
        trailerVideo : null,
        popularVideos : null,
        topRatedMovies : null,
        upcomingMovies : null
    },
    reducers:{
        addNowPlayingMovies: (state,action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo : (state, action) => {
            state.trailerVideo = action.payload
        },
        addPopularVideos : (state, action) => {
            state.popularVideos = action.payload
        },
        addTopRatedMovies : (state, action) => {
            state.topRatedMovies = action.payload
        },
        addUpcomingMovies : (state, action) => {
            state.upcomingMovies = action.payload   
        }
    },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularVideos,addTopRatedMovies, addUpcomingMovies } = moviesSlice.actions;

export default moviesSlice.reducer;