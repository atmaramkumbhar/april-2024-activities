package com.loan.loanapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.loan.loanapp.Entity.Loan;

@Repository
public interface LoanRepo extends JpaRepository<Loan, Integer>{
	
	@Query(value = "select p.loan_id from loan p where p.loan_type =:emailId",nativeQuery = true)
	int getLoanId(String emailId);
}
