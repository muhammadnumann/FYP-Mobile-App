import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, ScreenWidth } from "../../../utils";

const AgentDescription = ({ ProfileInfo }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Job Description</Text> */}
      <Text style={styles.desc}>
        {/* {ProfileInfo.bioDescription} */}
      </Text>
    </View>
  );
};

export default AgentDescription;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    color: COLORS.black,
    paddingVertical: 10,
  },
  desc: {
    textAlign: "justify",
    color: COLORS.grey,
  },
});
