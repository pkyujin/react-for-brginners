import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";

function Detail() {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [movie, setMovie] = useState(null);
  const [watchButtonText, setWatchButtonText] = useState("Watch Now");

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
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMovie(json.data.movie);
    };

    getMovie(); 

  }, [id]);

  const handleWatchButtonClick = () => {
    setWatchButtonText("Watching..."); 
    
  };

  useEffect(() => {
    return () => {
      setWatchButtonText("Watch Now");
    };
  }, []);


  return (
    <div>
      {movie ? (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
        {movie ? (
          <>
            <img src={movie.medium_cover_image} alt={movie.title} className="imgStyle" />
            <div>
              <h1>{movie.title}</h1>
              <p>{movie.summary}</p>
              <ul>
                {movie.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
              <a href="https://youtu.be/7hRy2N2CMhQ?si=a11pat9sU8juQOpY">
                <button className="watchButton" onClick={handleWatchButtonClick}>{watchButtonText}</button>
              </a>
              
            </div>
          </>
        ) : (
          <p>No movie data available</p>
        )}
      </div>      
      ) : ( 
        <h1 className="loader">{text}</h1>
      )}
    </div>
  );
}

export default Detail;

