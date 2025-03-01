// Preloader.js
import React from 'react';


const Preloader = () => {
  return (
    <div className="fixed w-full h-full bg-modal flex flex-col justify-center z-50">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Preloader;