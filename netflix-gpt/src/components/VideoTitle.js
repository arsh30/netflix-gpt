import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[10%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h2 className="md:text-5xl text-lg font-bold">{title}</h2>
      <p className="py-6 md:text-lg text-sm w-1/4">{overview}</p>

      <div className="">
        <button className="bg-[white] text-black px-12 p-4 text-xl hover:opacity-80 rounded-lg">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white mx-2 px-12 p-4 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
