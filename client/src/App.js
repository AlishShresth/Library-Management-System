import React from "react";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import LoginForm from "./components/login/LoginForm";
import Register from "./components/login/Register";
import Library from "./components/library/Library";
import NotFound from "./components/NotFound";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [user, setUser] = useState({});
  const getUsers = async () => {
    console.log("getUsers called");
    try {
      const response = await api.get("/api/users");
      console.log(response.data);
      setBooks(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getBooks = async () => {
    console.log("getBooks called");
    try {
      const response = await api.get("/api/books");
      console.log(response.data);
      setBooks(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getBorrowedBooks = async () => {
    console.log("getBorrowedBooks called");
    try {
      const response = await api.get("/api/borrows");
      console.log(response.data);
      setBorrowedBooks(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
    getBooks();
    getBorrowedBooks();
  }, []);
  const handleBorrow = (book) => {
    console.log(book.title);
  };
  const handleRenew = (bookId) => {
    const borrow = borrows.find((b) => b.bookId === bookId);
    const borrowId = borrow.id;
    console.log(borrowId);
    const newReturnDate = new Date();
    newReturnDate.setDate(newReturnDate.getDate() + 7); // Renew for 7 days

    api
      .put(`/api/borrows/${borrowId}`, { returnDate: newReturnDate })
      .then((response) => {
        const updatedBorrows = [...borrows];
        const index = updatedBorrows.findIndex((b) => b._id === borrowId);
        updatedBorrows[index].returnDate = newReturnDate;
        setBorrows(updatedBorrows);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/login"
            element={<LoginForm setLoggedIn={setLoggedIn} setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<Register setLoggedIn={setLoggedIn} setUser={setUser} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                loggedIn={loggedIn}
                borrows={borrowedBooks}
                user={user}
                handleRenew={handleRenew}
              />
            }
          />
          <Route
            path="/library"
            element={
              <Library
                loggedIn={loggedIn}
                books={books}
                onBorrow={handleBorrow}
              />
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          {/* <Redirect to="/not-found" /> */}
        </Routes>
      </div>
    </div>
  );
};
export default App;
