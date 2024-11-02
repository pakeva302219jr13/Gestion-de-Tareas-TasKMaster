import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className=" bg-blue-600 text-white p-2 rounded">
      {text}
    </button>
  );
};

export default Button;
