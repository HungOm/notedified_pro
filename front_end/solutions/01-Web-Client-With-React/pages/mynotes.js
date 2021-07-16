import React, { useEffect } from 'react';

const MyNotes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes — Notedified';
  });

  return (
    <div>
      <h1>Notedified</h1>
      <p>These are my notes</p>
    </div>
  );
};

export default MyNotes;
