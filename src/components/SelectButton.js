import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CustomIcon } from "./CustomIcon";
import { AppHeight, COLORS } from "../utils";

const SelectButton = ({ placeholder, IconName, navigation, value, error }) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => navigation()}>
        <View style={{ flexDirection: "row" }}>
          {<CustomIcon name={IconName} />}
          <Text
            style={{ fontWeight: "400", color: COLORS.grey, paddingLeft: 15 }}
          >
            {value ? (
              <Text style={{ color: COLORS.primary }}>{value} </Text>
            ) : (
              placeholder
            )}
          </Text>
        </View>
      </TouchableOpacity>

      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default SelectButton;

const styles = StyleSheet.create({
  container: {
    height: AppHeight(7),
    backgroundColor: COLORS.lightGrey,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
});
