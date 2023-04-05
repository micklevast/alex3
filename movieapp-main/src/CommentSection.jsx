import { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSection({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  // Fetch movie information on component mount
  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=263d22d8&plot=short&r=json`);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovie();
  }, [movieId]);

  // Fetch comments on component mount
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`https://example.com/comments?movieId=${movieId}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchComments();
  }, [movieId]);

  // Handle comment submission
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post('https://example.com/comments', {
        movieId,
        text: commentText
      });

      setCommentText('');
      setComments(comments => [...comments, response.data]);
    } catch (error) {
      console.error(error);
    }
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className='myMovie'>
        <h1>{movie.Title}</h1>
        <p>{`Year: ${movie.Year}`}</p>
        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
        <p>{`Rated: ${movie.Rated}`}</p>
      </div>
      <div className="myComment">
        <form onSubmit={handleSubmit}>
          <textarea value={commentText} onChange={event => setCommentText(event.target.value)} />
          <button type="submit">Submit Comment</button>
        </form>
        {comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.text}</p>
            <p>{`Posted by: ${comment.author} on ${comment.date}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
