import React, { useEffect, useState } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  // Current this we are FETCHING FROM TMDB API AND UPDATE STORE, BELOW FUNCTION IS RESPONSIBLE
  // FOR FETCHING FROM TMBD API_OPTIONS, SO WE WILL MAKE A CUSTOM HOOK THAT WE WILL FETCH THIS
  // BECAUSE BROWSE COMPONENT ME AGR HUM YE SAB KREGE TO IT LOOKS UGLY
  /*
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    // put this movie data in the Redux Store
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  */
  const showGPTSearch = useSelector((store) => store.gpt?.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpComingMovies();

  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}

      {/* 
      So its ui is complex - so we will divided it into 2 parts
      Main Container 
          - Video Background
          - Video Title
      Secondary Container
          - Movie List * n
          - Cards * n
      */}
    </div>
  );
};

export default Browse;
