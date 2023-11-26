import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <p className="text-2xl md:text-6xl font-bold">{title}</p>
      <p className="hidden md:inline-block text-lg w-1/2 py-6">{overview}</p>
      <div className="my-4 md:m-0">
        <button className="text-black bg-white py-1 px-3 md:py-4 md:px-12 w-36 hover:bg-opacity-80 rounded-lg">
          Play
        </button>
        <button className="hidden md:inline-block md:text-white mx-2 py-4 w-36 bg-gray-500 rounded-lg opacity-50">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
