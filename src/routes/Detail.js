import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMovie(json.data.movie);
    };

    getMovie(); 

  }, [id]);

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.summary}</p>
          <ul>
            {movie.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Detail;
