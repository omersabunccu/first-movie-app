import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify"
import VideoSection from "../components/VideoSection";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState();
  const [videoKey, setVideoKey] = useState()

  const { id } = useParams();

  const baseUrl = "https://api.themoviedb.org/3";
  const movieUrl = `${baseUrl}/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_APP_KEY}`;
  const videoUrl = `${baseUrl}/movie/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_APP_KEY}`;
  const imgUrl = `https://image.tmdb.org/t/p/w1280`;

  const fetchMovie = async () => {
    try {
      let res = await axios.get(movieUrl);
      setMovieDetails(res.data)
      res = await axios.get(videoUrl)
      setVideoKey(res.data.results[0].key)

    } catch (err) {
      toast.error("server error");
      throw new Error(err);
    }
  };


  useEffect(()=>{fetchMovie();}, [])

  return (
    <div className="py-5 page mt-5" style={{backgroundColor:'#555'}}>
      <div className="container">
        <div className="card mb-3 bg-dark text-light shadow-lg">
          <div className="row">
            <div className="col-md-4">
              <img src={`${imgUrl}${movieDetails?.poster_path}`} alt="" className="img-fluid"/>
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
                  <Link to={-1} className="btn btn-primary"> Back</Link>
                </li>

              </ul>
            </div>
            <div className="col-md-8 d-flex flex-column">
              <div className="card-body">
                <h3 className="text-center">{movieDetails?.title}</h3>
                {videoKey&&<VideoSection videoKey={videoKey}/>}
                <h5 className="card-title mt-4"> overview</h5>
                <p className="card-text"> {movieDetails?.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MovieDetails;