import React from 'react';
import SearchBar from '../../containers/SearchBar/SearchBar';

const Navigation = ({ onSearchSubmit }) => {
  return (
    <nav className="container mx-auto py-4 bg-gradient-to-r from-red-400 to-orange-300 rounded-lg mt-8 px-8 flex justify-between">
      <p className="text-4xl font-bold text-white">Art Gallery</p>
      <div className="flex items-center">
        <SearchBar onSearchSubmit={onSearchSubmit} />
      </div>
    </nav>
  );
};

export default Navigation;
