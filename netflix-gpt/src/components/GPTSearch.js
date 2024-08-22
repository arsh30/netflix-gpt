import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div>
      {/* GPT SEARCH BAR
    GptMovieSuggestion */}
      <div className="absolute -z-10">
        <img src={BG_URL} alt="logo" />
      </div>
      <GPTSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
