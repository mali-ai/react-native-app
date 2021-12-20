import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  INC_DEC_PRODUCT,
  ADD_TO_CART,
} from "./productsTypes";

const initialState = {
  loading: false,
  products: [],
  error: "",
  cart: [],
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
        error: "",
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: payload,
      };
    case INC_DEC_PRODUCT:
      const productUpdate = state?.products?.map((product) => {
        if (product?.id === payload?.id) {
          return {
            ...product,
            quantity: product?.quantity + payload?.quantity,
          };
        } else {
          return product;
        }
      });
      return {
        ...state,
        products: productUpdate,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state?.cart, payload?.id],
      };
    default:
      return state;
  }
};

export default productsReducer;
