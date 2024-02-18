import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/register", {
        email,
        password,
        name,
        age: parseInt(age, 10),
      });
      navigate("/users");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(`Registration failed: ${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:8080/login", { email, password });
      navigate("/users");
    } catch (error) {
      console.error("Login failed:", error);
      setError(`Login failed: ${error.message}`);
    }
  };

  const handleCloseSnackbar = () => {
    setError("");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        {isRegistering ? "Register" : "Login"}
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      {isRegistering && (
        <>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Age"
            type="number"
            variant="outlined"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
            margin="normal"
          />
        </>
      )}
      <Button
        variant="contained"
        onClick={isRegistering ? handleRegister : handleLogin}
        fullWidth
        style={{ marginBottom: "10px" }}
      >
        {isRegistering ? "Register" : "Login"}
      </Button>
      <Button
        color="secondary"
        onClick={() => setIsRegistering(!isRegistering)}
        fullWidth
      >
        {isRegistering ? "Go to Login" : "Go to Register"}
      </Button>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </Container>
  );
}

export default LoginPage;
