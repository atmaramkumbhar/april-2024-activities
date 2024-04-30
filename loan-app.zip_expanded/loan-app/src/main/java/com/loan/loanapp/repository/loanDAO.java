package com.loan.loanapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.loan.loanapp.Entity.Customer;
import com.loan.loanapp.Entity.Loan;

@Repository
public interface loanDAO extends JpaRepository<Customer, Integer>{
	//Customer findByEmail(String email);
	@Query(value = "select * from customer p where p.email_id =:emailId",nativeQuery = true)
	Customer findByEmailId(String emailId);
	
	@Query(value = "select p.customer_id from customer p where p.email_id =:emailId",nativeQuery = true)
	int getCustId(String emailId);
}
