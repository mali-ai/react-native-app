import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE,
  ADD_PHOTO,
  REMOVE_PHOTO,
} from "./photosTypes";
import * as MediaLibrary from "expo-media-library";

export const fetchPhotosRequest = () => ({
  type: FETCH_PHOTOS_REQUEST,
});

export const fetchPhotosSuccess = (photos) => ({
  type: FETCH_PHOTOS_SUCCESS,
  payload: photos,
});

export const fetchPhotosFailure = (error) => ({
  type: FETCH_PHOTOS_FAILURE,
  payload: error,
});

export const addPhoto = (photo) => ({
  type: ADD_PHOTO,
  payload: photo,
});

export const deletePhoto = (uri) => ({
  type: REMOVE_PHOTO,
  payload: uri,
});

export const fetchPhotos = () => {
  return (dispatch) => {
    dispatch(fetchPhotosRequest());
    MediaLibrary?.requestPermissionsAsync()
      .then((response) => {
        MediaLibrary?.getAlbumAsync("ReactNativeImages")
          .then((response) => {
            MediaLibrary?.getAssetsAsync({
              album: response,
              sortBy: ["creationTime"],
              mediaType: ["photo"],
            })
              .then((response) => {
                dispatch(fetchPhotosSuccess(response.assets));
              })
              .catch((error) => {
                const errorMsg = error?.message;
                dispatch(fetchPhotosFailure(errorMsg));
              });
          })
          .catch((error) => {
            const errorMsg = error?.message;
            dispatch(fetchPhotosFailure(errorMsg));
          });
      })
      .catch((error) => {
        const errorMsg = error?.message;
        dispatch(fetchPhotosFailure(errorMsg));
      });
  };
};
