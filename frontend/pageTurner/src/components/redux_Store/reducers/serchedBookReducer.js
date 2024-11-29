import { SEARCH_BOOK } from "../actionsCreators/cartActions";

const initialState = [];

export const serchedBookReducer = (state = initialState, action) => {
  if (action.type === SEARCH_BOOK) {
    console.log("from search book reducer", action.payload);
    return (state = action.payload);
  }
  return state;
};
