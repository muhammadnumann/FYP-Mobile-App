import React from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default SuccessToast = (success, title) => {
  return Toast.show({
    type: "success",
    text1: success,
    text2: title,
    autoHide: true,
    visibilityTime: 2500,
    position: "top",
  });
};
