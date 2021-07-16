// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

const App =()=>{
    return (
        <div>
        <h1>Hello Notedified</h1>
        <p>Welcome to the Notedified app</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));