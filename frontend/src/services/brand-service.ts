import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { Brand } from "../types/brand";

export function findAllPaged(name: string, page: number, size = 3) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/brands",
    params: {
      name: name,
      page: page,
      size: size,
    },
  };

  return requestBackend(config);
}

export function findAll() {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/brands/list",
  };
  return requestBackend(config);
}

export function findById(brandId: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/brands/${brandId}`,
  };
  return requestBackend(config);
}

export function insert(brand: Brand) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/brands",
    data: brand,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function update(id: number, brand: Brand) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/brands/${id}`,
    data: brand,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function remove(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/brands/${id}`,
    withCredentials: true,
  };
  return requestBackend(config);
}
