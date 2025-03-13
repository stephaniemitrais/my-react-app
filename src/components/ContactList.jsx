import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactList.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editContact, setEditContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({ name: "", email: "", phone: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/contacts", {
        headers: { Authorization: `Bearer ${token}` }, 
      })
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      });
  }, []);


  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch(error => console.error("Error deleting contact:", error));
  };


  const handleEdit = (contact) => {
    setEditContact(contact.id);
    setUpdatedContact({ ...contact });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const contactData = {
        name: updatedContact.name,
        email: updatedContact.email,
        phone: updatedContact.phone
    };

    axios.put(`http://localhost:8080/contacts/${editContact}`, contactData, {
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(() => {
        setContacts(contacts.map(contact => 
            contact.id === editContact ? { ...contact, ...contactData } : contact
        ));
        setEditContact(null);
    })
    .catch(error => console.error("Error updating contact:", error));
};

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div className="contact-container">
      <h2>Contact List</h2>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No Contacts Found</td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact.id}>
                {editContact === contact.id ? (
                  <>
                    <td><input type="text" value={updatedContact.name} onChange={(e) => setUpdatedContact({ ...updatedContact, name: e.target.value })} /></td>
                    <td><input type="email" value={updatedContact.email} readOnly /></td>
                    <td><input type="text" value={updatedContact.phone} onChange={(e) => setUpdatedContact({ ...updatedContact, phone: e.target.value })} /></td>
                    <td>
                      <button className="btn save" onClick={handleUpdate}>Save</button>
                      <button className="btn cancel" onClick={() => setEditContact(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <button className="btn edit" onClick={() => handleEdit(contact)}>Edit</button>
                      <button className="btn delete" onClick={() => handleDelete(contact.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
