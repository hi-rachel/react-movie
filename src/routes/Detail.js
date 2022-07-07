import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Movie from "../components/Movie";

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
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>
            {movieDetail.title} ({movieDetail.year})
          </h1>
          <img src={movieDetail.medium_cover_image}></img>
          <div>
            {movieDetail.genres.map((g) => (
              <strong key={g}>-{g} </strong>
            ))}
          </div>
          <p>{movieDetail.runtime}m</p>
          <p>Rating : {movieDetail.rating}</p>
          <p>&#128150; Like : {movieDetail.like_count}</p>
          <p>{movieDetail.description_intro}</p>
          <p>
            <a href={movieDetail.url}>Download Movie</a>
          </p>
        </div>
      )}
    </div>
  );
}
export default Detail;
