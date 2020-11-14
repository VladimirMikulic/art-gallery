import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import logo from '../../icons/logo.png';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="container mx-auto py-4 bg-gradient-to-r from-red-400 to-orange-300 rounded-lg sm:px-8 px-4 flex justify-between items-center">
      <Link to="/">
        <img src={logo} className="w-32" alt="Art Gallery Logo" />
      </Link>
      <SearchBar />
    </nav>
  );
};

export default Navigation;
