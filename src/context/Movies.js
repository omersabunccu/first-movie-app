import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext()

export const MovieProvider = ({children})=>{

    const [movies, setMovies] = useState([])

    const baseUrl = 'https://api.themoviedb.org/3'
    const movieUrl = `${baseUrl}/discover/movie?api_key=${process.env.REACT_APP_MOVIE_APP_KEY}`

    useEffect(()=>{
        fetchMovies(movieUrl);
    }, [])

    const fetchMovies = async(url)=>{
        const res = await axios.get(url)
        setMovies(res.data.results)
    }

    return (
        <MovieContext.Provider value={{movies, setMovies}}>
            {children}
        </MovieContext.Provider>
    )
}


export const useMovie = ()=>{
    const ctx = useContext(MovieContext)
    return ctx;
}