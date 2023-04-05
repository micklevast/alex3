import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SignInPage=({ onSignIn })=> {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSignIn({ username, password, avatarUrl });
    };
  
    return (
      <div className="d-flex justify-content-center mt-5">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Sign in</h1>
          <Form.Group controlId="avatarUrl">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter avatar URL"
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Sign in
          </Button>
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </Form>
      </div>
    );
  }
  
export default SignInPage;
