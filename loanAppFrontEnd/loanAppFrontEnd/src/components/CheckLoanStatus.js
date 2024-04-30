import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CheckLoanStatus.css';  // Custom CSS for additional styling
import { Link } from 'react-router-dom';

const CheckLoanStatus = () => {
  const { customerId } = useParams();  // Extract customerId from the route
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [custId, setCustId] = useState(0);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        axios.get(`http://localhost:9091/loan/getCustId/${sessionStorage.getItem('custEmail')}`)
        .then(response => {setCustId(response.data); console.log("cust id: " + response.data)})
        .catch(error => {console.log(error)});
        sessionStorage.setItem('custId', custId);

        const response = await axios.get(`http://localhost:9091/loan/viewLaon/${sessionStorage.getItem('custId')}`);
        setApplications(response.data);
        setIsLoading(false);  // Loading complete
      } catch (error) {
        console.error('Error fetching loan applications', error);
        setError('Failed to fetch loan applications. Please try again later.');  // Set error message
      }
      
    };
    console.log(typeof(applications));
    console.log(applications);
  
    fetchLoanApplications();  // Fetch data on component mount
  });

  if (isLoading) {
    return <div className="loading">Loading loan applications...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
    <ul className="navbar-nav me-auto">
     <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>         
    </ul>
    <div className="loan-status-container">  {/* Apply custom container style */}
      <h2>Loan Status</h2>
      {applications.length > 0 ? (
        <ul className="application-list">  {/* Style list with custom CSS */}
          {applications.map((application) => (
            <li key={application.applicationId} className="application-item">
             <b>Loan ID:</b>  {application.loan.id} &nbsp;&nbsp;&nbsp;&nbsp; <b>Status:</b> {application.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No loan applications found for this customer.</p>  
      )}
    </div>
    </div>
  );
};

export default CheckLoanStatus;
