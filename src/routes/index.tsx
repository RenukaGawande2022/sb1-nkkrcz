import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import Search from '../pages/Search';
import Genre from '../pages/Genre';
import Language from '../pages/Language';
import Legal from '../pages/Legal';
import Contact from '../pages/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/search" element={<Search />} />
      <Route path="/genre/:id" element={<Genre />} />
      <Route path="/language/:id" element={<Language />} />
      <Route path="/privacy-policy" element={<Legal type="privacy" />} />
      <Route path="/terms-of-service" element={<Legal type="terms" />} />
      <Route path="/dmca" element={<Legal type="dmca" />} />
      <Route path="/about" element={<Legal type="about" />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;