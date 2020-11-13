import React from 'react';
import SearchBar from '../../containers/SearchBar/SearchBar';
import logo from '../../icons/logo.png';
import { Link } from 'react-router-dom';

const Navigation = ({ onSearchSubmit }) => {
  return (
    <nav className="container mx-auto py-4 bg-gradient-to-r from-red-400 to-orange-300 rounded-lg sm:px-8 px-4 flex justify-between">
      <Link to="/">
        <img src={logo} className="w-32" alt="Art Gallery Logo" />
      </Link>
      <div className="flex items-center">
        <SearchBar onSearchSubmit={onSearchSubmit} />
      </div>
    </nav>
  );
};

export default Navigation;
