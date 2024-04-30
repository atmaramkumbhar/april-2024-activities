package com.loan.loanapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.loan.loanapp.Entity.LoanApplication;

@Repository
public interface LoanApplicationRepo extends JpaRepository<LoanApplication, Integer>{
	
	@Query(value = "select * from loan_application p where p.customer_id =:id",nativeQuery = true)
	List<LoanApplication> findByCustId(int id);
}
