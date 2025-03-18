import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contactReducer, { fetchContacts, deleteContact, updateContact } from "../redux/contactSlice";
import ContactList from "./ContactList";
import { vi } from "vitest";

// Mock Redux actions
vi.mock("../redux/contactSlice", async (importOriginal) => {
    const actual = await importOriginal(); // Import actual module
    return {
      ...actual, // Spread actual exports
      fetchContacts: vi.fn(),
      deleteContact: vi.fn(),
      updateContact: vi.fn(),
    };
  });
  

// Create a test store with Redux Toolkit
const createTestStore = (initialState) =>
  configureStore({
    reducer: {
      contacts: contactReducer,
    },
    preloadedState: initialState,
  });

describe("ContactList Component", () => {
  let store;

  beforeEach(() => {
    store = createTestStore({
      contacts: {
        contacts: [
          { id: "1", name: "Alice", email: "alice@example.com", phone: "123-456-7890" },
          { id: "2", name: "Bob", email: "bob@example.com", phone: "987-654-3210" },
        ],
        loading: false,
        error: null,
      },
    });
    store.dispatch = vi.fn(); // Mock dispatch function
  });

  test("renders ContactList and fetches contacts", () => {
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    expect(screen.getByText("Contact List")).toBeInTheDocument();
    expect(store.dispatch).toHaveBeenCalledWith(fetchContacts());
  });

  test("displays loading state", () => {
    store = createTestStore({
      contacts: { contacts: [], loading: true, error: null },
    });

    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    expect(screen.getByText("Loading contacts...")).toBeInTheDocument();
  });

  test("displays error message if API fails", () => {
    store = createTestStore({
      contacts: { contacts: [], loading: false, error: "Network Error" },
    });

    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    expect(screen.getByText("Error loading contacts: Network Error")).toBeInTheDocument();
  });

  test("calls deleteContact action when delete button is clicked", () => {
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(deleteContact("1"));
  });

  test("allows user to edit a contact", () => {
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    const editButton = screen.getAllByText("Edit")[0];
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123-456-7890")).toBeInTheDocument();

    const phoneInput = screen.getByDisplayValue("123-456-7890");
    fireEvent.change(phoneInput, { target: { value: "111-222-3333" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(store.dispatch).toHaveBeenCalledWith(updateContact({ id: "1", contactData: { name: "Alice", email: "alice@example.com", phone: "111-222-3333" } }));
  });
});
