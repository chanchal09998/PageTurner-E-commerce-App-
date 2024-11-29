import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actionsCreators/cartActions";

const initialState = JSON.parse(localStorage.getItem("cartItem")) || [];

const cartReducer = (state = initialState, action) => {
  let updatedState;

  if (action.type === ADD_TO_CART) {
    const existingBook = state.find((book) => book._id === action.payload._id);
    if (!existingBook) {
      updatedState = [...state, action.payload].map((book) => ({
        ...book,
        quantity: 1,
      }));
    } else {
      updatedState = state.map((book) => ({
        ...book,
        quantity: 1,
      }));
    }
  } else if (action.type === REMOVE_FROM_CART) {
    updatedState = state.filter((book) => book._id !== action.payload);
  } else if (action.type === CLEAR_CART) {
    updatedState = [];
  } else {
    updatedState = state;
  }

  localStorage.setItem("cartItem", JSON.stringify(updatedState));
  return updatedState;
};

export default cartReducer;
