import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-4 text-white">
      <h2 className="text-3xl py-4">{title}</h2>
      <div className="flex overflow-x-scroll">
        <div className="flex gap-2">
          {movies?.map((elem) => {
            return (
              <MovieCard key={elem.id} posterPath={elem && elem?.poster_path} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
