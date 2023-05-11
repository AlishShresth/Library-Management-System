import React, { useEffect, useState } from "react";
import "./library.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import { useNavigate } from "react-router-dom";
const Dashboard = ({ loggedIn, books, onBorrow }) => {
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const { length: count } = books;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const pageBooks = paginate(books, currentPage, pageSize);
  return (
    <div className="gpt3__dashboard section__padding">
      <div className="gpt3__dashboard-content">
        <h3 className="gradient__text">Available Books</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="title">Title</th>
              <th>Author</th>
              <th>Edition</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {pageBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.edition}</td>
                <td>{book.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
