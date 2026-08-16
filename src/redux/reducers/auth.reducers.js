import { LOGIN_SUCCESS, LOGOUT, UPDATE_USER } from "../actionTypes";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
};

export default authReducer;