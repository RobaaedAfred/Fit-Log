import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default page;