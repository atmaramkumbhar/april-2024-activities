import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewLoans.css';  // Custom CSS for additional styling
import Navbar from './Navbar';
import { Link } from 'react-router-dom';



const ViewLoans = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [custId, setCustId] = useState(0);
  const [lId, setLId] = useState(0);
  const isLoggedIn = sessionStorage.getItem('loggedIn');
  const insertData = (loan) => {
    axios.get(`http://localhost:9091/loan/getCustId/${sessionStorage.getItem('custEmail')}`)
    .then(response => {setCustId(response.data); console.log("cust id: " + response.data)})
    .catch(error => {console.log(error)});

    axios.get(`http://localhost:9091/loan/getLoanId/${loan.loanType}`)
    .then(response => {setLId(response.data); console.log("loan id: " + response.data)})
    .catch(error => {console.log(error)});

    console.log("after fetching :: " + custId + " " + lId);
    axios.post('http://localhost:9091/loan/applyLoan', {"custId":custId,"loanId":lId,"status":"Pending"})
     .then(response => alert("Applied for loan " + loan.loanType +" successfully."))
     .catch(error => console.log(error));

     sessionStorage.setItem('custId', custId);
  }

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:9091/loan/loans');
        setLoans(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching loans', error);
        setError('Failed to fetch loans. Please try again later.');
      }
    };

    fetchLoans();
    return () => {
      window.removeEventListener('beforeunload', preventRefresh);
    };
  }, []);

  const preventRefresh = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  window.addEventListener('beforeunload', preventRefresh);


  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
   <div>
    <div className="container-fluid">
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
              <Link className="nav-link" to="/check-loan-status">
                Check Loan Status
              </Link></li>
     <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>         
    </ul>
    </div>
    <div className="view-loans-container">  {/* Apply custom container style */}
     
      <h2 className="heading">Available Loans</h2>  {/* Style the heading */}
      
      <ul className="loan-list">  {/* Apply custom styling for list */}
        {loans.map((loan) => (
          <li key={loan.loanId} className="loan-item">  {/* Style list items */}
            {loan.loanType }  
            <button
              // className="apply-button"
              onClick={() => {insertData(loan)}}
            >
              Apply  {/* Apply with reduced size */}
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ViewLoans;
