import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className=" bg-black">
      <div className="mt:0 md:-mt-52 pl-16 relative z-20">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies?.trendingMovies} />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList
          title={"Upcoming Movies"}
          movies={movies?.nowPlayingMovies}
        />
        <MovieList title={"Horror Movies"} movies={movies?.nowPlayingMovies} />
      </div>
      {/* 
      Movie List - popular
            Movie Card * n
      Movie List - Now Playing
      Movie List - Trending
      Movie List - Horror

      */}
    </div>
  );
};

export default SecondaryContainer;
