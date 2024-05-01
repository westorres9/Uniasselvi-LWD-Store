import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { Category } from "../types/category";

export function findAllPageable(name: string, page: number, size = 3) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/categories",
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
    url: "/categories/list",
  };
  return requestBackend(config);
}

export function findById(id: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/categories/${id}`,
  };

  return requestBackend(config);
}

export function insert(category: Category) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "categories",
    data: category,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function update(id: number, category: Category) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/categories/${id}`,
    data: category,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function remove(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/categories/${id}`,
    withCredentials: true,
  };
  return requestBackend(config);
}
