import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import VideoSection from "../components/VideoSection";
import noImage from "../images/noimage.jpg";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState();
  const [videoKey, setVideoKey] = useState();
  const [actors, setActors] = useState([]);

  const { id } = useParams();

  const baseUrl = "https://api.themoviedb.org/3";
  const movieUrl = `${baseUrl}/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_APP_KEY}`;
  const videoUrl = `${baseUrl}/movie/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_APP_KEY}`;
  const imgUrl = `https://image.tmdb.org/t/p/w1280`;
  const actorsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_APP_KEY}`;

  const fetchMovie = async () => {
    try {
      let res = await axios.get(movieUrl);
      setMovieDetails(res.data);
      console.log(res.data);
      res = await axios.get(videoUrl);
      setVideoKey(res.data.results[0]?.key);
      res = await axios.get(actorsUrl);
      setActors(res.data?.cast?.slice(0, 5));
    } catch (err) {
      toast.error("server error");
      throw new Error(err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className="py-5 page mt-5" style={{ backgroundColor: "#555" }}>
      <div className="container">
        <div className="card mb-3 bg-dark text-light shadow-lg">
          <div className="row align-items-center">
            <div className="col-md-4">
              {movieDetails?.poster_path && (
                <img
                  src={`${imgUrl}${movieDetails?.poster_path}`}
                  alt=""
                  className="img-fluid"
                />
              )}
              {!movieDetails?.poster_path && (
                <img src={noImage} alt="" className="img-fluid w-100" />
              )}

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <b>Relaese Date:</b>
                  <span> {movieDetails?.relaese_date} </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <b>Rate:</b>
                  <span> {movieDetails?.vote_average} </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <b>Total Votes:</b>
                  <span> {movieDetails?.vote_count} </span>
                </li>
                <li className="list-group-item text-center">
                  <Link to={-1} className="btn btn-success">
                    {" "}
                    Back
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="text-center">{movieDetails?.title}</h3>
                {videoKey && <VideoSection videoKey={videoKey} />}
                <div className="text-center">
                  {movieDetails?.genres.map((item) => (
                    <h3
                      className="badge rounded-pill bg-light text-dark mt-5 mx-2 p-2"
                      key={item.id}
                    >
                      {item.name}
                    </h3>
                  ))}
                </div>
                <h5 className="card-title mt-4"> Overview</h5>
                <p className="card-text"> {movieDetails?.overview}</p>

                <div className="row justify-content-evenly">
                  {actors.map((actor) => 
                  (
                    <div className="col-md-2">
                      <img src={`${imgUrl}/${actor?.profile_path}`} className="img-fluid" title={actor.name}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
