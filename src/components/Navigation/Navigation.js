import React from 'react';
import SearchBar from '../../containers/SearchBar/SearchBar';
import logo from '../../icons/logo.png';

const Navigation = ({ onSearchSubmit }) => {
  return (
    <nav className="container mx-auto py-4 bg-gradient-to-r from-red-400 to-orange-300 rounded-lg sm:px-8 px-4 flex justify-between">
      <img src={logo} className="w-32" alt="Art Gallery Logo" />
      <div className="flex items-center">
        <SearchBar onSearchSubmit={onSearchSubmit} />
      </div>
    </nav>
  );
};

export default Navigation;
