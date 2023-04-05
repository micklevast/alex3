import { useState, useEffect } from "react";
import React from "react";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import Allmovies from "./Allmovies";
import ContactPage from "./ContactPage";
import AboutPage from "./AboutPage";
import Footer from "./Footer";
import MovieDetails from "./MovieDetails";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
const fs = require("fs");
const bcrypt = require("bcrypt");

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const Appp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const getMovieRequest = async (searchTerm) => {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=263d22d8`;
    // console.log('urllllllLLLLLLLLLLL:',url)

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchTerm);
  }, [searchTerm]);

  const getMovieOnSearch = (MySearchMovies) => {
    setMovies(MySearchMovies);
  };
  // -------------

  const handleSignIn = (credentials) => {
    try {
      // Read user data from local file
      const usersData = JSON.parse(fs.readFileSync("users.json"));
      // Find user with matching username
      const user = usersData.find((u) => u.username === credentials.username);
      // Check if password matches hashed password
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      // Handle error if users.json file not found
      if (error.code === "ENOENT") {
        fs.writeFileSync("users.json", "[]");
        alert("No users found. Please sign up first.");
      } else {
        console.error(error);
        alert("An error occurred while signing in. Please try again.");
      }
    }
  };
  
  const handleSignUp = (userData) => {
    try {
      // Read existing user data from local file
      const usersData = JSON.parse(fs.readFileSync("users.json"));
      // Check if user already exists
      if (usersData.some((u) => u.username === userData.username)) {
        alert("User already exists. Please choose a different username.");
        return;
      }
      // Hash user's password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(userData.password, salt);
      // Add user to array of users
      const newUser = {
        avatarUrl: userData.avatarUrl,
        username: userData.username,
        password: hashedPassword,
      };
      usersData.push(newUser);
      // Write updated user data to local file
      fs.writeFileSync("users.json", JSON.stringify(usersData));
    } catch (error) {
      // Handle error if users.json file not found
      if (error.code === "ENOENT") {
        fs.writeFileSync("users.json", "[]");
        handleSignUp(userData);
      } else {
        console.error(error);
        alert("An error occurred while signing up. Please try again.");
      }
    }
  };

  const handleSignOut = () => {
    // TODO: implement sign-out logic
    localStorage.removeItem("currentUser");
    setCurrentUser({ username: "Guest", avatarUrl: "https://dummyimage.com/100x100/000/fff&text=Guest" });
    setIsAuthenticated(false);
  };
  // -------------

  return (
    <BrowserRouter>
      <Navbar myMovies={getMovieOnSearch} />
      <div className="container-fluid" style={{ padding: "0 50px" }}>
        <Routes>
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route
            exact
            path="/signin"
            element={<SignInPage onSignIn={handleSignIn} />}
          />
          <Route
            exact
            path="/signup"
            element={<SignUpPage onSignUp={handleSignUp} />}
          />
          {isAuthenticated ? (
            <Route exact path="/" element={<Allmovies movies={movies} />} />
          ) : (
            <Navigate to="/signin" />
          )}
          {isAuthenticated && (
            <Route path="/movies/:id" element={<MovieDetails />} />
          )}
        </Routes>
      </div>
      <Footer
        updateMovies={setMovies}
        onSignOut={handleSignOut}
        currentUser={currentUser}
      />
    </BrowserRouter>
  );
};

export default Appp;
