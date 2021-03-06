import React, { useEffect } from 'react';

let animateUp = '';
const About = () => {
  useEffect(() => {
    animateUp = 'animate-up';
  }, []);

  return (
    <div className={animateUp}>
      <h1>About This App</h1>
      <p className='my-1'>This is a contact keeper app which stores contacts</p>
      <p className='bg-dark p'>
        <strong>Version: </strong> 1.0.0
      </p>
    </div>
  );
};

export default About;
