export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const FINAL_CHECKOUT = "FINAL_CHECKOUT";
export const CLEAR_CART = "CLEAR_CART";
export const LOAD_CART = "LOAD_CART";
export const SEARCH_BOOK = "SEARCH_BOOK";

export const addToCart = (book) => {
  return {
    type: ADD_TO_CART,
    payload: book,
  };
};

export const removeFromCart = (bookId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: bookId,
  };
};

export const clearCart = () => ({
  type: CLEAR_CART,
});

// export const addressDetails = (address) => {
//   return {
//     type: USER_ADDRESS,
//     payload: address,
//   };
// };
export const loadFinalCart = () => {
  return {
    type: LOAD_CART,
    payload: JSON.parse(localStorage.getItem("cartItem")) || [],
  };
};
export const updateQuantity = (bookId, quantity) => {
  return {
    type: FINAL_CHECKOUT,
    payload: { bookId, quantity },
  };
};

export const searchAnyBook = (books) => {
  return {
    type: SEARCH_BOOK,
    payload: books,
  };
};
