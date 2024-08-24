import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => {
      return video.type === "Trailer";
    });

    const trailer = filterData.length ? filterData[0] : json.results[0];
    // setTrailerId(trailer.key);
    dispatch(addTrailerVideo(trailer)); // This will hit the action which we create , and it will put the key inside this
  };
  useEffect(() => {
    if (!trailerVideo) {
      getMovieTrailer();
    }
  }, []);
};
export default useMovieTrailer;
