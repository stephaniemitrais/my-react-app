import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AddContact.css";

const AddContact = () => {
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });
    const history = useHistory();

    const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/contacts", contact) //
        .then(() => {
        history.push("/dashboard");
        })
        .catch(error => console.error("Error adding contact:", error));
    };

    return (
    <div className="form-container">
        <h2>Add New Contact</h2>
        <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={contact.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={contact.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="phone" value={contact.phone} onChange={handleChange} required />

        <button type="submit" className="btn save">Save</button>
        <button type="button" className="btn cancel" onClick={() => history.push("/dashboard")}>
            Cancel
        </button>
        </form>
    </div>
    );
};

export default AddContact;
