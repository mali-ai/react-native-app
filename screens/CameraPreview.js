import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const CameraPreview = ({ photo, retakePicture, savePhoto }) => (
  <View style={styles?.container}>
    <ImageBackground
      source={{ uri: photo && photo?.uri }}
      style={{
        flex: 1,
      }}
    >
      <View style={styles?.controlPanel}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={retakePicture} style={styles?.panelButton}>
            <Text style={styles?.panelText}>Re-take</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={savePhoto} style={styles?.panelButton}>
            <Text style={styles?.panelText}>Save photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet?.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  controlPanel: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    justifyContent: "flex-end",
  },
  panelText: {
    color: "#fff",
    fontSize: 20,
  },
  panelButton: {
    width: 130,
    height: 40,

    alignItems: "center",
    borderRadius: 4,
  },
});

export default CameraPreview;
