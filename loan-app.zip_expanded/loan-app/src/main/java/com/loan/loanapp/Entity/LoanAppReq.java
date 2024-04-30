package com.loan.loanapp.Entity;

public class LoanAppReq {
	
	private int applicationId;
	private String status;
	private int custId;
	private int loanId;
	public int getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getCustId() {
		return custId;
	}
	public void setCustId(int custId) {
		this.custId = custId;
	}
	public int getLoanId() {
		return loanId;
	}
	public void setLoanId(int loanId) {
		this.loanId = loanId;
	}
	@Override
	public String toString() {
		return "LoanAppReq [applicationId=" + applicationId + ", status=" + status + ", custId=" + custId + ", loanId="
				+ loanId + "]";
	}
	
	

}
