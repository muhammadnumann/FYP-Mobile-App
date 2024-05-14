import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CustomIcon } from "./CustomIcon";
import { TouchableOpacity } from "react-native";

const CustomCheckBox = ({ isChecked, onPress }) => {
  const iconName = isChecked ? "CheckedIcon" : "UnCheckIcon";
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
        <CustomIcon name={iconName} size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "flex-start",
    alignItems: "center",
    // flexDirection: "row",
    // width: 150,
    marginTop: 5,
    marginHorizontal: 5,
  },
  // title: {
  //   fontSize: 16,
  //   color: "#000",
  //   marginLeft: 5,
  //   fontWeight: "600",
  // },
});
