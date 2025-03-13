import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ContactList from "../components/ContactList";
import { IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Dashboard.css";

const Dashboard = ({ username }) => {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(username || "Guest");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setCurrentUser(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.replace("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="header">
          <Typography variant="h5" className="welcome-text">
            Welcome, {currentUser}!
          </Typography>

          <IconButton onClick={handleLogout} color="error">
            <LogoutIcon />
          </IconButton>
        </div>

        <ContactList />
      </div>
    </div>
  );
};

export default Dashboard;
