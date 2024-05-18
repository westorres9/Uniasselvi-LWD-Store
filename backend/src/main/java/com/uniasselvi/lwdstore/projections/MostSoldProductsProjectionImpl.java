package com.uniasselvi.lwdstore.projections;

public class MostSoldProductsProjectionImpl implements MostSoldProductsProjection {
	
	private String productName;
	private double totalQuantity;
	
	public MostSoldProductsProjectionImpl(String productName, double totalQuantity) {
		this.productName = productName;
		this.totalQuantity = totalQuantity;
	}
	@Override
	public String getProductName() {
		return productName;
	}
	
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	@Override
	public double getTotalQuantity() {
		return totalQuantity;
	}
	
	public void setTotalQuantity(double totalQuantity) {
		this.totalQuantity = totalQuantity;
	}

	

}
