import React from 'react';
import logo from '../img/logo.svg';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Notedified Logo" height="40" />
      <h1>Notedified</h1>
    </header>
  );
};

export default Header;
