import { useMovie } from "../context/Movies";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const { movies } = useMovie();
  return (
    
      <div className="d-flex justify-content-center flex-wrap page gap-2" style={{backgroundColor:"#555"}}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    
  );
};

export default Home;
