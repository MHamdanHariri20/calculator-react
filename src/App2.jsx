import React from "react";
import Books from "./Books";
import { Routes, Route } from "react-router-dom";
import Book from "./Book";

const App2 = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/post/:id" element={<Book />} />
      </Routes>
    </>
  );
};

export default App2;