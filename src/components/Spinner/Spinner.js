import React from 'react';
import './Spinner.css';

const Spinner = ({ width, height }) => {
  return (
    <div className="spinner" style={{ width, height }}>
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Spinner;
