import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const CustomNotification = ({ title, body }) => {
  return (
    <View style={styles.container}>
      {/* <Image source={imageSource} style={styles.image} /> */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    color: "#444444",
  },
});

export default CustomNotification;
