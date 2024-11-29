import { FINAL_CHECKOUT, LOAD_CART } from "../actionsCreators/cartActions";

const intialState = [];
export const updatedCartQuantity = (state = intialState, action) => {
  if (action.type === LOAD_CART) {
    return (state = action.payload);
  }
  if (action.type === FINAL_CHECKOUT) {
    const updatedState = state.map((book) => {
      if (book._id === action.payload.bookId) {
        return {
          ...book,
          quantity: action.payload.quantity,
        };
      }
      return book;
    });
    return updatedState;
  } else {
    return state;
  }
};
