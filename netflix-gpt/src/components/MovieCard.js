import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  console.log("Path", posterPath);

  return (
    <div className="w-48">
      <img className="" src={IMG_CDN_URL + posterPath} alt="movie Card" />
    </div>
  );
};

export default MovieCard;
