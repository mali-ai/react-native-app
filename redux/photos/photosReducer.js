import {
    FETCH_PHOTOS_REQUEST,
    FETCH_PHOTOS_SUCCESS,
    FETCH_PHOTOS_FAILURE,
    ADD_PHOTO,
    REMOVE_PHOTO,
  } from "./photosTypes";
  
  const initialState = {
    loading: false,
    photos: [],
    error: "",
  };
  
  const photosReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case FETCH_PHOTOS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_PHOTOS_SUCCESS:
        return {
          ...state,
          loading: false,
          photos: payload,
          error: "",
        };
      case FETCH_PHOTOS_FAILURE:
        return {
          ...state,
          loading: false,
          photos: [],
          error: payload,
        };
      case ADD_PHOTO:
        return {
            ...state,
            photos: [...state?.photos, payload],
        }
      case REMOVE_PHOTO:
        const filteredPhotos = state?.photos?.filter(photo => photo?.uri !== payload);
        return {
          ...state,
          photos: filteredPhotos,
        };
      default:
        return state;
    }
  };
  
  export default photosReducer;
  