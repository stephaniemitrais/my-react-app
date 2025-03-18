import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, deleteContact, updateContact } from "../redux/contactSlice"; 
import "./ContactList.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contacts);
  
  const [editContact, setEditContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    dispatch(fetchContacts()); // Fetch contacts when component mounts
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
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

    dispatch(updateContact({ id: editContact, contactData: contactData }));
    setEditContact(null);
  };

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p>Error loading contacts: {error}</p>;

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