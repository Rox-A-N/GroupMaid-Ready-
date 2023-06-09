import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import LogoBar from '../LogoBar/LogoBar';

import { MdOutlineMessage, MdHome, MdLogin } from 'react-icons/md';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div>
        <div>
          <LogoBar />
        </div>
      </div>
      <div>
        <Link className="navLink" to="/why-us">
          Why Us
        </Link>

        <Link className="navLink" to="/home">
          <MdHome />
        </Link>

        <Link className="navLink" to="/contact">
          <MdOutlineMessage />
        </Link>

        {/* If no user is logged in, show these links */}
        {!user.id ? (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login/selection">
            <MdLogin />
          </Link>
        ) : (
          
          <LogOutButton className="navLink" />
        )}
      </div>
    </div>
  );
}

export default Nav;
