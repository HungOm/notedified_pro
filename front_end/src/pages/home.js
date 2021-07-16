import React from 'react';
// import the Link component from react-router
import  Header from '../components/header';
import Navigation from '../components/navigation'

const Home = () => {
  return (
    <div>

        <Header/>
        <Navigation/>
        <p>This is home page</p>
      
    </div>
  );
};
export default Home;
