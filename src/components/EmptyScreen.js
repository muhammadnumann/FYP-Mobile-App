import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
 import CustomButton from "./CustomButton";
import {
  AppHeight,
  COLORS,
  fontSize,
  ScreenHeight,
  ScreenWidth,
} from "../utils";

const EmptyScreen = ({
  source,
  subTitle,
  buttonName,
  onNavigate,
  height,
  width,
  subText,
}) => {
  return (
    <View style={{ height: ScreenHeight / 1.3, paddingHorizontal: 15 }}>
      <Image
        source={source}
        style={[styles.sampleImage, { height, width }]}
        resizeMode="cover"
      />

      <View style={{ paddingVertical: AppHeight(6) }}>
        <Text style={styles.sampleText}>{subTitle}</Text>
        <Text style={styles.subText}>{subText}</Text>
      </View>

      <View style={styles.viewBtn}>
        <CustomButton title={buttonName} onPress={onNavigate} />
      </View>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  viewBtn: {
    position: "absolute",
    bottom: 0,
    height: ScreenHeight * 0.1,
    width: ScreenWidth * 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  sampleText: {
    marginTop: 1,
    textAlign: "center",
    fontWeight: 700,
    fontSize: fontSize.title,
  },
  sampleImage: {
    alignSelf: "center",
    marginTop: AppHeight(15),
  },
  subText: {
    color: COLORS.grey,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: fontSize.mini,
  },
});

