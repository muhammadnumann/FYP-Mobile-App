import { Spinner } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { AppFontSize, AppHeight, COLORS, fontSize } from "../utils";
import { CustomIcon } from "./CustomIcon";

const CustomBorderButton = ({
  title,
  onPress,
  width,
  center,
  height,
  fontSize,
  top,
  status,
  iconName,
  loading,
  disable,
}) => {
  if (status === "Completed") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          height: height ? height : AppHeight(7),
          width: width,
          backgroundColor: COLORS.greenLight,
          marginVertical: top ? top : 20,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: center ? "center" : null,
          borderRadius: 8,
          borderColor: COLORS.greenSolid,
          borderWidth: 1,
        }}
        disabled={disable}
      >
        <Text
          style={{
            color: COLORS.greenSolid,
            fontWeight: "bold",
            fontSize: fontSize ? fontSize : 18,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  } else if (status === "Cancelled") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          height: height ? height : 55,
          width: width,
          backgroundColor: COLORS.redLight,
          marginVertical: top ? top : 20,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: center ? "center" : null,
          borderRadius: 8,
          borderColor: COLORS.redSolid,
          borderWidth: 1,
        }}
        disabled={disable}
      >
        <Text
          style={{
            color: COLORS.redSolid,
            fontWeight: "bold",
            fontSize: fontSize ? fontSize : 18,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          height: height ? height : AppHeight(7),
          width: width,
          backgroundColor: COLORS.primaryLight,
          marginVertical: top ? top : 20,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: center ? "center" : null,
          borderRadius: 8,
          borderColor: COLORS.primary,
          borderWidth: 1,
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
                color: COLORS.primary,
                fontWeight: "bold",
                fontSize: fontSize ? fontSize : AppFontSize(2),
                marginLeft: iconName ? 10 : 0,
              }}
            >
              {title}
            </Text>
          </>
        ) : loading ? (
          <Spinner color={COLORS.primary} />
        ) : (
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: "bold",
              fontSize: fontSize ? fontSize : AppFontSize(2),
            }}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
};

export default CustomBorderButton;
