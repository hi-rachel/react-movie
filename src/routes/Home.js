import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styles from "../css/Home.module.css";
import Img from "../img/github.png";

console.log(Img);

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9.0&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <div className={styles.loading_page}>
          <h1 id="loading">Loading...&#127916;</h1>
        </div>
      ) : (
        <>
          <div className={styles.home_header}>
            <h2 className={styles.home_header_left}>
              Movies with a rating of 9.0 or higher &#127942;
            </h2>
            <div className={styles.home_header_right}>
              <a
                href="https://github.com/hi-rachel/react-movie.git"
                alt="hi-rachel git-hub"
                target="_blank"
              >
                <img
                  className={styles.git_logo}
                  src={
                    "/react-movie/static/media/github.4ad10c7de2748bcc606b.png"
                  }
                  alt="git-hub logo"
                />
                <p className={styles.home_codeLink}>hi-rachel</p>
              </a>
            </div>
          </div>
          <div className={styles.home_align}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
