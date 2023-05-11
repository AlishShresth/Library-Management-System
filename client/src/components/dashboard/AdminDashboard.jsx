import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const handleRenew = async (borrowId) => {
    try {
      await api.put(`/api/borrows/${borrowId}`);
      // refresh the borrowedBooks data after renewing
    } catch (error) {
      console.log(error);
    }
  };
  const handleReturn = async (borrowId) => {
    try {
      await api.delete(`/api/borrows/${borrowId}`);
      // refresh the borrowedBooks data after returning
    } catch (error) {
      console.log(error);
    }
  };
  // const handleEditUser = (userId) => {
  //   navigate(`/users/${userId}/edit`);
  // };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      api
        .delete(`/api/users/${userId}`)
        .then(() => {
          alert("user deleted");
          // User successfully deleted
          // TODO: Show success message to user and update state to remove user from list
        })
        .catch((error) => {
          console.log(error);
          // TODO: Show error message to user
        });
    }
  };

  const handleEditBook = (bookId) => {
    navigate(`/books/${bookId}/edit`);
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      api
        .delete(`/books/${bookId}`)
        .then(() => {
          // Book successfully deleted
          // TODO: Show success message to user and update state to remove book from list
        })
        .catch((error) => {
          console.log(error);
          // TODO: Show error message to user
        });
    }
  };

  useEffect(() => {
    // Fetch borrowed books
    api.get("/api/borrows").then((response) => {
      setBorrowedBooks(response.data);
    });

    // Fetch users
    api.get("/api/users").then((response) => {
      setUsers(response.data);
    });

    // Fetch books
    api.get("/api/books").then((response) => {
      setBooks(response.data);
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Borrowed Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Due Date</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((borrow) => (
            <tr key={borrow.id}>
              <td>{borrow.book.title}</td>
              <td>{borrow.book.author}</td>
              <td>{borrow.dueDate}</td>
              <td>{borrow.user.name}</td>
              <td>
                <button onClick={() => handleRenew(borrow.id)}>Renew</button>
                <button onClick={() => handleReturn(borrow.id)}>Return</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>
                <button onClick={() => handleEditBook(book.id)}>Edit</button>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
