import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState([]);
  const { id } = useParams();
  const getMovieDetail = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setMovieDetail(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovieDetail();
  }, []);
  return (
    <div>
      {loading ? (
        <div className={styles.loading_detail}>
          <h1>Loading...&#127871;{movieDetail.title}</h1>
        </div>
      ) : (
        <div className={styles.movie_detail}>
          <div className={styles.detail_left}>
            <h1 className={styles.detail_title}>
              {movieDetail.title} ({movieDetail.year})
            </h1>
            <img
              className={styles.detail_img}
              src={movieDetail.large_cover_image}
            ></img>
          </div>
          <div className={styles.detail_right}>
            <div className={styles.detail_detail}>
              <p>
                <b>Running Time: {movieDetail.runtime}m</b>
              </p>
              <p>
                <b>Rating : {movieDetail.rating} / 10</b>
              </p>
              <p>
                <b>Like : {movieDetail.like_count} &#128154;</b>
              </p>
            </div>
            <p className={styles.detail_description}>
              {movieDetail.description_full}
            </p>
            <div>
              {movieDetail.genres.map((g) => (
                <a
                  className={styles.movie_genres}
                  href="#"
                  title="Movie Genres"
                  key={g}
                >
                  {g}
                </a>
              ))}
            </div>
            <p>
              <a
                className={styles.yts}
                href={movieDetail.url}
                alt="Download Movie"
                target="_blank"
              >
                Download Movie
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
