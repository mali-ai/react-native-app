import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";

const Cart = ({ navigation }) => {
  const { cart, products } = useSelector((state) => state?.products);
  return (
    <View style={styles?.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => item + index}
        renderItem={(item) => {
          const found = products.find((element) => element?.id === item?.item);
          return (
            <View style={styles?.items}>
              <Text>Name: {found?.name}</Text>
              <Text>Quantity: {found?.quantity}</Text>
              <Text>Price: {found?.price}</Text>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <Text style={{ fontSize: 40, textAlign: "center" }}>
            It's Empty for Now!
          </Text>
        )}
        ListFooterComponent={() => {
          if (cart?.length === 0) {
            return <></>;
          } else {
            return (
              <Button
                title="Checkout"
                onPress={() => {
                  navigation?.navigate("MapView");
                }}
              />
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet?.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  items: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#CADADC",
    borderRadius: 10,
  },
});

export default Cart;
