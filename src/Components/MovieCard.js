import React from "react";
import { IMG_CDN_URL } from "../Utils/constants";
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {
  const { id, posterPath } = props;
  const navigate = useNavigate();

  const handleWatch = () => {
    navigate(`/watch/${id}`);
  };

  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img
        className="cursor-pointer"
        src={IMG_CDN_URL + posterPath}
        alt="Poster"
        onClick={handleWatch}
      />
    </div>
  );
};

export default MovieCard;
