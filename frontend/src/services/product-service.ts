import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { Product } from "../types/product";

export function findPageRequest(page: number, name: string, size = 12) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/products",
    params: {
      page: page,
      name: name,
      size: size,
    },
  };
  return requestBackend(config);
}

export function findAllPageable(page: number, name: string, size = 3) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/products",
    params: {
      page: page,
      name: name,
      size: size,
    },
  };
  return requestBackend(config);
}

export function findProductsOnSaleOff() {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/products/saleoff`,
  };
  return requestBackend(config);
}

export function findProductsByCategory(categoryId: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/categories/${categoryId}/products`,
  };
  return requestBackend(config);
}

export function findProductsByBrand(brandId: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/brands/${brandId}/products`,
  };
  return requestBackend(config);
}

export function findById(id: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/products/${id}`,
  };
  return requestBackend(config);
}

export function insert(product: Product) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/products",
    data: product,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function update(id: number, product: Product) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/products/${id}`,
    data: product,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function remove(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/products/${id}`,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function findProductsHighlight(specialSelectId: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/products/special-select/${specialSelectId}`
  };
  return requestBackend(config);
}
