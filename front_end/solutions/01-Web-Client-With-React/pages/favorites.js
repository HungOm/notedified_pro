import React, { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Favorites — Notedified';
  });

  return (
    <div>
      <h1>Notedified</h1>
      <p>These are my Favorites</p>
    </div>
  );
};

export default Favorites;
