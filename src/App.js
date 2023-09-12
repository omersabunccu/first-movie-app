import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, Login, MovieDetails, Register } from "./pages";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/details/:id" element={<PrivateRoute/>}>
          <Route path="" element={<MovieDetails/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
