import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import ViewLoans from './components/ViewLoans';
import { Loan } from './components/loan';
import ApplyLoan from './components/ApplyLoan';
import CheckLoanStatus from './components/CheckLoanStatus';
import Navbar from './components/Navbar';
import { Logout } from './components/Logout';

const App = () => {
  const isLoggedIn = sessionStorage.getItem('loggedIn');

  return (
    <Router>
     {!isLoggedIn ? <Navbar /> :null }  {/* Navigation at the top */}
      <div className="container mt-3">  {/* Bootstrap container for spacing */}
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Loan/>} />
           <Route path="/view-loans" element={<ViewLoans />} />
          <Route path="/check-loan-status" element={<CheckLoanStatus />} /> 
          <Route exact path="/" element={<Loan />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
