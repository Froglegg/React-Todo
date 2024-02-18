// In src/components/Navigation.js

import React from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

function Navigation() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/users">
            Users
          </Button>
          <Button color="inherit" component={RouterLink} to="/todos">
            Todos
          </Button>
          <Button
            color="inherit"
            onClick={async () => {
              try {
                await axios.post("http://localhost:8080/logout");
              } catch (error) {
                console.error("Logout failed:", error);
              }
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
