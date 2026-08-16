import { ORDERS_LOADED, ADD_ORDER } from "../actionTypes";

export const ordersLoaded = (orders) => ({
  type: ORDERS_LOADED,
  payload: orders,
});

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});