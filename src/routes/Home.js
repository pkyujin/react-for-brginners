import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import "./Home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState(""); 
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadingText = "Looading..";
    let index = 0;
    const intervalId = setInterval(() => {
      
      setText(prevText => prevText + loadingText[index]);
      index++;
      if (index === loadingText.length) {
        index = 0;
        setText(""); 
      }
    }, 80);

    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year");
      const data = await response.json();
      setMovies(data.data.movies);
      setLoading(false); 
    };

    fetchMovies();
  }, []);

  return (
    <div>
      {loading ? ( 
        <h1 className="loader">{text}</h1>
      ) : (
        <div className="movie-container">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-box">
              <Movie
                id={movie.id}
                coverImg={movie.medium_cover_image}
                genres={movie.genres}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home; 

