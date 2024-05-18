import { User } from "./../types/user";
import { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";
import { requestBackend } from "../utils/requests";

export function getLoggedUser() {
  const config: AxiosRequestConfig = {
    method: "GET",
    baseURL: BASE_URL,
    withCredentials: true,
    url: "/users/me",
  };
  return requestBackend(config);
}

export function findAllPageable(name: string, page: number, size = 3) {
  const config: AxiosRequestConfig = {
    method: "GET",
    withCredentials: true,
    url: "/users",
    params: {
      name: name,
      page: page,
      size: size,
    },
  };
  return requestBackend(config);
}

export function findById(id: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/users/${id}`,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function register(user: User) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/users",
    data: user,
  };
  return requestBackend(config);
}

export function insertOperator(user: User) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/users/operator",
    data: user,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function update(id: number, user: User) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/users/${id}`,
    data: user,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function remove(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/users/${id}`,
    withCredentials: true,
  };
  return requestBackend(config);
}
