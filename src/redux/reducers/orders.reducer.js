import { ORDERS_LOADED, ADD_ORDER } from "../actionTypes";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_LOADED:
      return { ...state, orders: action.payload };

    case ADD_ORDER:
      return { ...state, orders: [action.payload, ...state.orders] };

    default:
      return state;
  }
};

export default ordersReducer;