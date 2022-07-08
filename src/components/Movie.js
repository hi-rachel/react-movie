import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../css/Movie.module.css";

function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div>
      <div className={styles.movie}>
        <div className={styles.movie_justify}>
          <Link className={styles.movie_link} to={`/movie/${id}`}>
            <img src={coverImg} alt={title} className={styles.movie_img} />
          </Link>
          <h2 className={styles.movie_title}>
            <Link className={styles.movie_link} to={`/movie/${id}`}>
              {title}
            </Link>
          </h2>
        </div>
        <p className={styles.movie_summary}>
          {summary.length > 200 ? `${summary.slice(0, 200)}...` : summary}
        </p>
        <ul>
          <li>
            {genres.map((g) => (
              <li className={styles.movie_genres} key={g}>
                <a href="#" title="Movie Genres">
                  {g}
                </a>
              </li>
            ))}
          </li>
        </ul>
      </div>
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
