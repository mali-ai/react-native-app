import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  INC_DEC_PRODUCT,
  ADD_TO_CART,
} from "./productsTypes";

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (users) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: users,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const incDecProduct = (id, quantity) => ({
  type: INC_DEC_PRODUCT,
  payload: {
    id: id,
    quantity: quantity,
  },
});

export const addToCart = (id) => ({
  type: ADD_TO_CART,
  payload: {
    id: id,
  },
});

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsRequest());
  const products = require("../../data/food.json");
  dispatch(fetchProductsSuccess(products));
};
