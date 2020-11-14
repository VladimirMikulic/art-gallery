import React from 'react';
import './Spinner.css';

const Spinner = ({ width = '3rem', height = '3rem' }) => {
  return (
    <div className="spinner" style={{ width, height }}>
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Spinner;
