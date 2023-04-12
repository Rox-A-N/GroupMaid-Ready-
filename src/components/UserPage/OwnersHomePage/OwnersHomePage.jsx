import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import requestImg from './Request.png'; 
import viewImg from './View.png';


function OwnersHomePage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Owners Home Page'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Owners Home Page');

  return (
    <div>
      <h2 className='heading'>{heading}</h2>
      <div className='container'>
        <img src={requestImg} alt="image of two cleaners with cleaning tools" />
        <button className='btn'>Create A Request</button>
      </div>
      <div className='container'>
        <img src={viewImg} alt="image of a person writing in a planner" />
        <button className='btn'>View Requests</button>
      </div>
    </div>
  );
}

export default OwnersHomePage;
