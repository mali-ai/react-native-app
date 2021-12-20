import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import photosReducer from "./photos/photosReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  photos: photosReducer,
});

export default rootReducer;
