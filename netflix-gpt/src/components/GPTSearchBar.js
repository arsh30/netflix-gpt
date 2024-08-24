import React, { useRef } from "react";
import lang from "./languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/GptSlice";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // search movie in TMDB API
  const searchMovieTmdb = async (movie) => {
    const data = fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGPTSearchClick = async () => {
    // make an api call to gpt api and get the movie results

    // this will throw error that you are running in a browser like environment
    // means frontend par handle kr rahe hai, and YEH API BACKEND SE HANDLE HONI CHAIYE

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Singh is King, Golmaal";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // Handle Api
      console.log("Gpt Api Fails to Fetch May be key is wrong");
    }

    // [Andaz apna apna, Hera Pheri, Chupke Chupke, Jane bhi do Yara, Padosan]
    const gptMoviesArray = gptResults.choices?.[0]?.message?.content.split(",");

    // For each movie I will Search TMDB API
    const promiseArrayMovies = gptMoviesArray.map((movie) =>
      searchMovieTmdb(movie)
    ); // This is async function So it return promise, because it takes some time to execute
    const tmdbResult = await Promise.all(promiseArrayMovies); // promise.all accepts an Array
    // console.log("Tmdb Result", tmdbResult);

    dispatch(
      addGptMovieResult({ movieName: gptMoviesArray, movieResults: tmdbResult })
    );
  };
  return (
    <div className="pt-[35%] md:pt-[8%] ">
      <form
        onSubmit={(e) => e.preventDefault()}
        action=""
        className=" w-full md:w-1/2 mx-auto bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          className="p-4 m-4 col-span-9"
        />
        <button
          onClick={handleGPTSearchClick}
          className="py-2 px-4 m-4 bg-red-700 text-white rounded col-span-3"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
