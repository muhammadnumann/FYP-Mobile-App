import React from "react";
import { View } from "react-native"; 
import { COLORS } from "../../utils";

const CustomDivider = ({ top }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
        marginTop: top ? top : 15,
      }}
    ></View> 
  );
};

export default CustomDivider;

export let sadaifName = 'sadaif';