import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    trendingMovies: null,
    upComingMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      // Inside this reducer function, have to update my Store
      state.nowPlayingMovies = action.payload; // Jo bhi data payload me aayega vo sab idr store krre hai
    },

    addPopularMovies: (state, action) => {
      // Inside this reducer function, have to update my Store
      state.popularMovies = action.payload; // Jo bhi data payload me aayega vo sab idr store krre hai
    },

    addTrendingVideos: (state, action) => {
      // Inside this reducer function, have to update my Store
      state.trendingMovies = action.payload; // Jo bhi data payload me aayega vo sab idr store krre hai
    },

    addUpcomingMovies: (state, action) => {
      // Inside this reducer function, have to update my Store
      state.upComingMovies = action.payload; // Jo bhi data payload me aayega vo sab idr store krre hai
    },

    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTrendingVideos,
  addUpcomingMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
