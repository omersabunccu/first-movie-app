import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { logout } from "../firebase";
const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const logoutHandler = () => {
    logout();
    navigate('/login')
    
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
              <input type="search" className="form-control me-2" placeholder="Search"/>
              <button className="btn btn-outline-success"> Search </button>
              </form>

              <h4 className="text-capitalize d-inline-block text-warning mx-2"> {currentUser?.displayName} </h4>
              <button className="btn btn-outline-light" onClick={logoutHandler}>Logout</button>
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
