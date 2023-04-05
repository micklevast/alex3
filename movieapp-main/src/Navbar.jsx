import React ,{useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Appp'
import SearchIcon from "./search.svg";
const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";


const Navbar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  // ---------


  const getMovieRequest = async (searchTerm) => {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchTerm);
    props.myMovies(movies)
  }, [searchTerm]);
  // ---------

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: "0 50px" }}>
      <div className="container-fluid" style={{ maxWidth: "100vw" }}>
        <Link to="/" className="navbar-brand">
          <img src="./aimovie-logo.png" alt="logoo" className="d-inline-block align-top me-2" />
          <Link>Logo Name</Link>
        </Link>
        <form className="d-flex ms-auto">
          {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button> */}

    {/* ---------- */}
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
    {/* ---------- */}
          
        </form>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav" style={{ marginLeft: "auto" }}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginRight: "50px" }}>
            <li className="nav-item">
              <Link to="/" className="nav-Link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-Link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-Link">Contact</Link>
            </li>
          </ul>
          <div className="navbar-user d-flex align-items-center">
            <img src="user.png" alt="user" className="rounded-circle me-2" />
            <Link>Login Name</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
