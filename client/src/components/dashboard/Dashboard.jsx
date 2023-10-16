import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./dashboard.css";
const Dashboard = ({ loggedIn, user, handleRenew, borrows, setBorrows }) => {
  // console.log(borrows);
  // const [borrows, setBorrows] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const userId = user.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      api
        .get(`/api/borrows/user/${userId}`)
        .then((response) => {
          setBorrows(response.data);
          const bookIds = response.data.map((borrow) => borrow.bookId);
          Promise.all(bookIds.map((bookId) => api.get(`/api/books/${bookId}`)))
            .then((bookResponses) => {
              const borrowedBooks = bookResponses.map(
                (response) => response.data
              );
              setBorrowedBooks(borrowedBooks);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn, navigate, userId]);

  return (
    <div className="gpt3__dashboard section__padding">
      <div className="gpt3__dashboard-content">
        <h3 className="gradient__text">Borrowed Books</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="title">Title</th>
              <th>Author</th>
              <th className="due-date">Due Date</th>
              <th>Renew</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book, index) => (
              <tr key={book.id}>
                <td className="title">{book.title}</td>
                <td>{book.author}</td>
                <td className="due-date">{borrows[index].returnDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleRenew(book.id)}
                  >
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
