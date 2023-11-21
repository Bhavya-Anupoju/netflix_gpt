// MovieCard.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieCard from "../MovieCard";

const mockProps = {
  id: "123",
  posterPath: "/path/to/poster.jpg",
};

test("MovieCard renders correctly and handles click event", () => {
  render(
    <BrowserRouter>
      <MovieCard {...mockProps} />
    </BrowserRouter>
  );

  // Check that the MovieCard component is rendered
  const movieCardElement = screen.getByAltText("Poster");
  expect(movieCardElement).toBeInTheDocument();

  // Simulate a click event on the MovieCard component
  fireEvent.click(movieCardElement);

  // Check that the navigation is triggered correctly
  expect(window.location.pathname).toBe(`/watch/${mockProps.id}`);
});

test("MovieCard does not render when posterPath is not provided", () => {
  render(
    <BrowserRouter>
      <MovieCard id={mockProps.id} />
    </BrowserRouter>
  );

  // Check that the MovieCard component is not rendered when posterPath is not provided
  const movieCardElement = screen.queryByAltText("Poster");
  expect(movieCardElement).not.toBeInTheDocument();
});
