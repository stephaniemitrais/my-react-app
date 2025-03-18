import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/contacts";
const token = localStorage.getItem("token");


export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
});


export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id) => {
  await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return id;
});

export const updateContact = createAsyncThunk("contacts/updateContact", async ({ id, contactData }) => {
  const response = await axios.put(`${API_URL}/${id}`, contactData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  return { id, ...response.data };
});

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => { state.loading = true; })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.map(contact =>
          contact.id === action.payload.id ? { ...action.payload } : contact
        );
      });
  }
});

export default contactSlice.reducer;