import { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";
import { requestBackend } from "../utils/requests";
import { Order } from "../types/order";

export function findAllPaged(page: number, size = 5) {
  const config: AxiosRequestConfig = {
    method: "GET",
    baseURL: BASE_URL,
    url: "/orders",
    params: {
      page: page,
      size: size,
    },
    withCredentials: true,
  };
  return requestBackend(config);
}

export function findById(orderId: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    baseURL: BASE_URL,
    url: `/orders/${orderId}`,
    withCredentials: true,
  };
  return requestBackend(config);
}

export function placeOrderRequest(order: Order) {
  const config: AxiosRequestConfig = {
    method: "POST",
    withCredentials: true,
    baseURL: BASE_URL,
    url: `/orders`,
    data: order,
  };
  return requestBackend(config);
}

export function changeStatus(id: number, order: Order) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    withCredentials: true,
    baseURL: BASE_URL,
    url: `/orders/${id}/change-status`,
    data: order,
  };
  return requestBackend(config);
}

export function getSalesByMonth() {
  const config: AxiosRequestConfig = {
    url: "/orders/monthly",
    method: "GET",
    withCredentials: true,
  };

  return requestBackend(config);
}

export function getSalesByDay() {
  const config: AxiosRequestConfig = {
    url: "/orders/daily",
    method: "GET",
    withCredentials: true,
  };

  return requestBackend(config);
}

export function getMostSoldProducts() {
  const config: AxiosRequestConfig = {
    url: "/orders/most-sold-products",
    method: "GET",
    withCredentials: true,
  };

  return requestBackend(config);
}

export function getClientsWhoMostPurchased() {
  const config: AxiosRequestConfig = {
    url: "/orders/client-most-purchase",
    method: "GET",
    withCredentials: true,
  };

  return requestBackend(config);
}
