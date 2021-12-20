import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraPreview from "../screens/CameraPreview";
import {addPhoto} from "../redux/photos/photosActions";
import { useDispatch } from "react-redux";
let camera;
const CameraScreen = ({ navigation }) => {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera?.Constants?.Type.back);
  const dispatch = useDispatch();
  useEffect(async () => {
    const { status } = await Camera?.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert?.alert("Access denied");
    }
  }, []);
  const takePicture = async () => {
    const photo = await camera?.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };
  const savePhoto = async () => {
    const { status } = await MediaLibrary?.requestPermissionsAsync();
    if (status === "granted") {
      const assert = await MediaLibrary?.createAssetAsync(capturedImage?.uri);
      MediaLibrary?.createAlbumAsync("ReactNativeImages", assert);
      dispatch(addPhoto(assert));
      navigation?.navigate("Products");
    } else {
      Alert?.alert("Access denied");
    }
  };
  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };
  const switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };
  return (
    <View style={styles?.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={savePhoto}
              retakePicture={retakePicture}
            />
          ) : (
            <Camera
              type={cameraType}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r;
              }}
            >
              <View style={styles?.controlPanel}>
                <TouchableOpacity
                  onPress={switchCamera}
                  style={styles?.flipOption}
                >
                  <Text style={styles?.flipText}>Flip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={takePicture}
                  style={styles?.captureButton}
                />
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet?.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    alignSelf: "flex-end",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginLeft: 105,
    marginBottom: 10,
  },
  controlPanel: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  flipOption: {
    alignSelf: "flex-end",
    marginLeft: 35,
    marginBottom: 40,
  },
  flipText: {
    fontSize: 15,
    color: "white",
  },
});

export default CameraScreen;
