import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function PropertiesPage(props) {
  //const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Properties');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default PropertiesPage;