import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { logout } from "../firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useMovie } from "../context/Movies";


const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_APP_KEY}&query=`

const Navbar = () => {
  const { currentUser } = useAuth();
  const [setMovies] = useMovie()
  const navigate = useNavigate();
  const [search, setSearch] = useState();


  const logoutHandler = () => {
    logout();
    navigate("/login");
  };


  const searchHandle = async(e)=>{
    e.preventDefault()
    //VALIDATION
    if(search.trim()===''){
      toast.error('Please Enter A Movie Name')
      return
    }

    const res = await axios(`${searchUrl}${search}`)

    if(res.data.results.length>0){
      setMovies(res.data.results)
      navigate('/')
    } else {
      toast.error('no movies with that name')
    }
    



  }
  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-dark"
      style={{ backgroundColor: "#070707" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h4 className="text-danger">React Movie App</h4>
        </Link>

        <div className="d-flex align-items-center">
          {currentUser ? (
            <>
              <form className="d-flex">
                <input
                  type="search"
                  className="form-control me-2"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" onClick={searchHandle}> Search </button>
              </form>

              <h4 className="text-capitalize d-inline-block text-warning mx-2">
                {" "}
                {currentUser?.displayName}{" "}
              </h4>
              <button className="btn btn-outline-light" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-light ms-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline-light ms-2"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
