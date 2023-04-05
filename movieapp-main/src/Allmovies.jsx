import React from 'react'
import {  Link,useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard'
import './Allmovie.css'

const Allmovies = (props) => {
    const navigate = useNavigate();
    return (
        <div>
          {props.movies?.length > 0 ? (
            <div className="container">
              {props.movies.map((movie) => (
                <Link to={`/movies/${movie.imdbID}`}>
                <MovieCard key={movie.imdbID} movie={movie} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
        </div>
      );
    };

export default Allmovies;
