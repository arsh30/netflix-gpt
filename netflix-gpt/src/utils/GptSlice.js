import { createSlice } from "@reduxjs/toolkit";

const GPTSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieName: null,
  },
  reducers: {
    toggleGPTSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieName, movieResults } = action.payload;
      state.movieName = movieName;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGPTSearchView, addGptMovieResult } = GPTSlice.actions;
export default GPTSlice.reducer;
