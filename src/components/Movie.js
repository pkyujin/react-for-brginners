import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Movie.css"; 

function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div className="movie">
      <Link to={`/movie/${id}`}>
        <img className="cover-img" src={coverImg} alt={title} />
      </Link>
      <h2>{title}</h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;

