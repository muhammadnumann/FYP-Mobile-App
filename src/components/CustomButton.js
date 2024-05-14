import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { AppFontSize, AppHeight, AppWidth, COLORS } from "../utils";
import { CustomIcon } from "./CustomIcon";
import { Spinner } from "native-base";
const CustomButton = ({
  title,
  onPress,
  height,
  fontSize,
  width,
  top,
  center,
  iconName,
  loading,
  backgroundColor,
  disable,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: height ? height : AppHeight(7),
        width: width ? width : AppWidth(90),
        backgroundColor: backgroundColor ? backgroundColor : COLORS.primary,
        marginVertical: top ? top : 20,
        alignSelf: center ? "center" : null,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: iconName ? "row" : null,
        opacity: disable ? 0.5 : 1, // Add opacity based on the disable prop
      }}
      disabled={disable}
    >
      {iconName ? (
        <>
          <CustomIcon name={iconName} />
          <Text
            style={{
              color: COLORS.white,
              fontWeight: "bold",
              fontSize: fontSize ? fontSize : AppFontSize(2),
              marginLeft: iconName ? 10 : 0,
            }}
          >
            {title}
          </Text>
        </>
      ) : loading ? (
        <Spinner color="white" />
      ) : (
        <Text
          style={{
            color: COLORS.white,
            fontWeight: "bold",
            fontSize: fontSize ? fontSize : AppFontSize(2),
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
