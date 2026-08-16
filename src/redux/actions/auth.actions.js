import { LOGIN_SUCCESS, LOGOUT, UPDATE_USER } from "../actionTypes";

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER,
  payload: user,
});