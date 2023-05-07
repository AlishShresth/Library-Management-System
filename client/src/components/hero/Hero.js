import React from "react";
import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const Hero = ({ books }) => {
  return (
    <div className="movie-carousel-container">
      <Carousel>
        {books.map((book) => {
          return (
            <Paper>
              <div className="movie-card-container">
                <div className="movie-detail">
                  <div className="movie-poster">
                    <img src={book.cover} alt="" />
                  </div>
                  <div className="movie-title">
                    <h4>{book.title}</h4>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
