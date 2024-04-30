import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = sessionStorage.getItem('loggedIn');
  const freeSession = (e)=>{
    sessionStorage.clear();
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Loan App
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
         { isLoggedIn ? (  <li className="nav-item">
             
            </li>):( <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>)}

            { isLoggedIn ? (<li className="nav-item">
              <Link className="nav-link" to="/view-loans">
                View Loans
              </Link>
            </li>):  (<li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>)}
            
            { isLoggedIn ?( <li className="nav-item">
              <Link className="nav-link" to="/check-loan-status">
                Check Loan Status
              </Link>
            </li>):(<li></li>)}
          </ul>
        </div>
      </div>
  </nav> 
  );
};

export default Navbar;
