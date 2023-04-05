import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';
import './MovieDetails.css';


const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      const fetchMovie = async () => {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=263d22d8`);
        alert('aaaaaaaaaaaaa')
        const data = await response.json();
        setMovie(data);
      };
      fetchMovie();
    }, [id]);
  
    if (!movie) {
      return <div>Loading...</div>;
    }
    const { Title, Year, Rated, Runtime, Director, Plot, Poster } = movie;
    return (
        <div className="movie-container">
          {movie && (
            <div className="movie-details">
              <div className="movie-info">
                <div className="movie-poster">
                  <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                  <div className="movie-overlay">
                    <h1>{movie.Title}</h1>
                    <p>{`Year: ${movie.Year}`}</p>
                    <p>{`Rated: ${movie.Rated}`}</p>
                    <p>{`IMDb Rating: ${movie.imdbRating}`}</p>
                  </div>
                </div>
              </div>
              <div className="comment-section">
                <CommentSection movieId={id} />
              </div>
            </div>
          )}
          
        </div>
      );
    };
  

export default MovieDetails;
