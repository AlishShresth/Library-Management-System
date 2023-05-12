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
import moment from "moment";

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
  const handleRenew = (borrowBookId) => {
    console.log(borrowedBooks);
    const borrow = borrowedBooks.find((b) => b.bookId === borrowBookId);
    console.log(borrowBookId);
    const borrowId = borrow.id;
    console.log(borrowId);
    if (!borrow) {
      console.log(`No borrow found for borrow with id: ${borrowBookId}`);
      return;
    }

    const newReturnDate = moment(borrow.returnDate)
      .add(14, "days")
      .format("YYYY-MM-DD");
    console.log(
      `New return date for borrow with id ${borrowId}: ${newReturnDate}`
    );
    api
      .put(`/api/borrows/${borrowId}`, {
        ...borrow,
        returnDate: newReturnDate,
      })
      .then(() => {
        setBorrowedBooks((prevBorrows) =>
          prevBorrows.map((b) =>
            b.id === borrowId ? { ...b, returnDate: newReturnDate } : b
          )
        );
      })
      .catch((err) => {
        console.log(`Error renewing borrow with id ${borrowId}:`, err);
      });
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
                setBorrows={setBorrowedBooks}
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
