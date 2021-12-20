import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  incDecProduct,
  addToCart,
} from "../redux/products/productsActions";
import { fetchPhotos, deletePhoto as deletePicture } from "../redux/photos/photosActions";
import * as MediaLibrary from "expo-media-library";

const Products = ({ navigation }) => {
  const { loading, products, error, cart } = useSelector(
    (state) => state?.products
  );
  const { photos } = useSelector((state) => state?.photos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchPhotos());
  }, []);
  const deletePhoto = (uri) => {
    const found = photos?.find((photo) => photo?.uri === uri);
    MediaLibrary?.deleteAssetsAsync(found)
      .then((response) => {
        if (response) {
          dispatch(deletePicture(uri));
        }
      })
      .catch((error) => {
        Alert?.alert(error?.message);
      });
  };

  if (loading) {
    return null;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <View style={styles?.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate("Camera");
          }}
        >
          <Ionicons
            style={styles.camera}
            name="camera-outline"
            size={32}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate("Cart");
          }}
        >
          <Ionicons
            style={styles.cart}
            name="cart-outline"
            size={32}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        contentContainerStyle={{ alignSelf: "center" }}
        data={products}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return (
            <View style={styles?.items}>
              <Text>{item?.name}</Text>
              <Text>Price: {item?.price}</Text>
              <Text>Quantity: {item?.quantity}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(incDecProduct(item?.id, 1));
                  }}
                  disabled={item?.quantity === item?.maxQuantity ? true : false}
                >
                  <Ionicons name="add-circle-outline" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(incDecProduct(item?.id, -1));
                  }}
                  disabled={item?.quantity === 0 ? true : false}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={32}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles?.addToCart}
                onPress={() => {
                  dispatch(addToCart(item?.id));
                }}
                disabled={
                  cart?.some((product) => product === item?.id) ||
                  item?.quantity == 0
                }
              >
                <Text>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
      {photos !== [] ? (
        <FlatList
          horizontal
          contentContainerStyle={{ alignSelf: "center" }}
          data={photos}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            return (
              <View style={styles?.items}>
                <Image source={{ uri: item?.uri }} style={styles?.images} />
                <TouchableOpacity
                  onPress={() => {
                    deletePhoto(item?.uri);
                  }}
                >
                  <Ionicons
                    style={styles.cart}
                    name="trash-outline"
                    size={32}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text>Media Library Access Denied</Text>
      )}
    </View>
  );
};

const styles = StyleSheet?.create({
  container: {
    flex: 1,
  },
  items: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 10,
    backgroundColor: "#CADADC",
    borderRadius: 10,
  },
  images: { width: 200, height: 250, resizeMode: "cover" },
  addToCart: {
    backgroundColor: "gray",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  camera: { marginLeft: 20, marginTop: 30 },
  cart: { marginRight: 20, marginTop: 30 },
});

export default Products;
