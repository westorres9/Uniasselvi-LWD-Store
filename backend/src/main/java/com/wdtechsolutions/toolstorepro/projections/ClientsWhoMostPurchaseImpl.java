package com.wdtechsolutions.toolstorepro.projections;

public class ClientsWhoMostPurchaseImpl implements ClientsWhoMostPurchase {
	
	private String client;
	private double totalPurchased;
		
	public ClientsWhoMostPurchaseImpl(String client, double totalPurchased) {
		this.client = client;
		this.totalPurchased = totalPurchased;
	}
	
	@Override
	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}
	
	@Override
	public double getTotalPurchased() {
		return totalPurchased;
	}
	
	public void setTotalPurchased(double totalPurchased) {
		this.totalPurchased = totalPurchased;
	}
}
