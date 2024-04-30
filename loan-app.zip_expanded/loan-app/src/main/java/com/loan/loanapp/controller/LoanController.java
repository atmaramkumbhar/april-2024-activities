package com.loan.loanapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loan.loanapp.Entity.Customer;
import com.loan.loanapp.Entity.Loan;
import com.loan.loanapp.Entity.LoanAppReq;
import com.loan.loanapp.Entity.LoanApplication;
import com.loan.loanapp.Entity.LoginRequest;
import com.loan.loanapp.repository.LoanRepo;
import com.loan.loanapp.repository.loanDAO;
import com.loan.loanapp.service.LoanService;

import jakarta.persistence.EntityNotFoundException;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/loan")
public class LoanController {
	
	@Autowired
	LoanService loanService;
	
	@Autowired
	loanDAO loanDao;
	
	@Autowired
	LoanRepo laonRepo;
	
	@PostMapping(path = "/register")
	public ResponseEntity<Object> registerCustomer(@RequestBody Customer customer){
		Customer cust = loanService.findByEmail(customer.getemailId());
		if(cust != null) {
			return ResponseEntity.badRequest().body("Record Already Exist");
		}
		loanService.saveCustomer(customer);
		return ResponseEntity.status(201).body(customer);
	}
	
	@PostMapping(path = "/login")
	public ResponseEntity<Customer> loginCustomer(@RequestBody LoginRequest loginReq){
		Customer cust = loanService.findByEmail(loginReq.getEmail());
		if (cust == null || !cust.getPassword().equals(loginReq.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
	}
	
	@GetMapping(path = "/loans")
	public ResponseEntity<Object> getLoans(){
		return ResponseEntity.status(200).body(loanService.allLoans());
	}
	
	@GetMapping(path = "/viewLaon/{id}")
	public ResponseEntity<Object> apply(@PathVariable String id){
		
		return ResponseEntity.status(200).body(loanService.viewLoan(Integer.parseInt(id)));
	}
	
	@PostMapping("/applyLoan")
    public ResponseEntity<LoanApplication> applyForLoan(@RequestBody LoanAppReq application) {
		System.out.println("application :: " + application.toString());
		int c = application.getCustId();
		int l = application.getLoanId();
		
		Customer existingCustomer = loanDao.findById(c)
                .orElseThrow(() -> new EntityNotFoundException("Customer with ID " + c + " not found"));

		Loan loanExis = laonRepo.findById(l)
                .orElseThrow(() -> new EntityNotFoundException("Loan with ID " + c + " not found"));

		
	
		LoanApplication appmod = new LoanApplication();
		appmod.setCustomer(existingCustomer);
		appmod.setLoan(loanExis);
		appmod.setStatus(application.getStatus());
		
        LoanApplication appliedLoan = loanService.applyForLoan(appmod);
        return ResponseEntity.ok(appliedLoan);
    }
	
	@GetMapping("/getCustId/{email}")
	public ResponseEntity<Object> getCustId(@PathVariable String email){
		return ResponseEntity.status(200).body(loanService.getCustId(email));
	}
	
	@GetMapping("/getLoanId/{type}")
	public ResponseEntity<Object> getLoanId(@PathVariable String type){
		return ResponseEntity.status(200).body(loanService.getLoanId(type));
	}
}
