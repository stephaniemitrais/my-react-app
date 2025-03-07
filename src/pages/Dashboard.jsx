import React from "react";
import ContactList from "../components/ContactList";
import { useHistory } from "react-router-dom";

const Dashboard = ({ username }) => {
  const history = useHistory();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome, {username || "Guest"}!</h2>
        <div>
            <button className="btn add-contact" onClick={() => history.push("/add-contact")}>
            + New Contact
            </button>
        </div>
      <ContactList />
    </div>
  );
};

export default Dashboard;