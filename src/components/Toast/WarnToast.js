import React from "react";
import Toast from "react-native-toast-message";

export default WarnToast = (error, title) => {
  return Toast.show({
    type: "error",
    text1: error,
    text2: title,
    autoHide: true,
    visibilityTime: 2500,
    position: "top",
  });
};
