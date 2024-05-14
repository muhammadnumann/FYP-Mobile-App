import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, fontSize } from "../utils";

const AuthHeader = ({ title, alignText }) => {
  return <Text style={[styles.header, { textAlign: alignText }]}>{title}</Text>;
};

export default AuthHeader;

const styles = StyleSheet.create({
  header: {
    color: COLORS.black,
    fontSize: fontSize.header,
    fontWeight: "bold",
  },
});
