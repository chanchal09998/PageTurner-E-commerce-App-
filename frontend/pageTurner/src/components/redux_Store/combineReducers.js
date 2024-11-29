import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducers";
import { updatedCartQuantity } from "./reducers/finalCheckout";
import { serchedBookReducer } from "./reducers/serchedBookReducer";

export const rootReducer = combineReducers({
  cartReducer,
  updatedCartQuantity,
  serchedBookReducer,
});
