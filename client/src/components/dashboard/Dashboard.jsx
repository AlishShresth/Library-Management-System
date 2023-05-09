import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ loggedIn }) => {
  console.log(loggedIn);

  const navigate = useNavigate();

  // async () => {
  //   try {
  //     const response = await api.get("/api/borrows");
  //     console.log(response.data);
  //     setBorrowedBooks(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
    // else {
    //   console.log("else");
    //   getBorrowedBooks();
    // }
  }, [loggedIn, navigate]);

  return (
    <div className="gpt3__dashboard section__padding">
      <div className="gpt3__dashboard-content">
        <h2>Dashboard</h2>
        <h3>Borrowed Books</h3>
        {/* <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Due Date</th>
              <th>Renew</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.dueDate}</td>
                <td>
                  <button onClick={() => handleRenew(book._id)}>Renew</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default Dashboard;
