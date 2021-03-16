import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../axios";

function Row({ title, fetchUrl, isLarge = false }) {
  const [movies, setMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLarge && movie.poster_path) ||
              (!isLarge && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLarge && "row__posterLarge"}`}
                key={movie.id}
                src={`${baseURL}${
                  isLarge ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
