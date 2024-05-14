import React, { useState, useEffect } from "react";
import CustomHeader from "../../../components/CustomHeader";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { AppHeight, AppWidth, COLORS } from "../../../utils";
import { View, SafeAreaView, Keyboard, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "react-query";
import SuccessToast from "../../../components/Toast/SuccessToast";
import WarnToast from "../../../components/Toast/WarnToast";
import { useToast } from "native-base";
import { ChangePassword } from "../../../services/SameApiServices";
import { useDispatch } from "react-redux";
import { Logout } from "../../../store/AuthActions";
import { useTranslation } from "react-i18next";

const ProfileChangePassword = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    mutate,
    data: response,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useMutation(ChangePassword);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.newPassword) {
      handleError(t("new_password_input_err_msg"), "newPassword");
      isValid = false;
    }
    if (!inputs.confirmPassword) {
      handleError(t("confirm_password_input_err_msg"), "confirmPassword");
      isValid = false;
    }
    if (isValid) {
      hanldeChangePassword();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(Logout());
      SuccessToast(t("Success"), response.message);
    }

    if (isError) {
      WarnToast(t("Error"), error);
    }
  }, [isSuccess, isError]);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const hanldeChangePassword = async () => {
    let user = await AsyncStorage.getItem("user");
    let userData = JSON.parse(user);
    let data = {
      password: inputs.newPassword,
      confirmPassword: inputs.confirmPassword,
      email: userData.email,
    };
    mutate(data);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.white, height: AppHeight(100) }}
    >
      <CustomHeader
        title={t("change") + " " + t("password_placeholder")}
        back
        navigation={navigation}
      />

      <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 20 }}>
          <CustomInput
            onChangeText={(text) => handleOnchange(text, "newPassword")}
            onFocus={() => handleError(null, "newPassword")}
            IconName="password"
            placeholder={t("enter_new_password")}
            error={errors.newPassword}
            password
          />
          <CustomInput
            onChangeText={(text) => handleOnchange(text, "confirmPassword")}
            onFocus={() => handleError(null, "confirmPassword")}
            IconName="password"
            placeholder={t("confirm_password")}
            error={errors.confirmPassword}
            password
          />
        </View>
      </View>
      <View style={styles.viewBtn}>
        <CustomButton
          title={t("save")}
          onPress={validate}
          loading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileChangePassword;

const styles = StyleSheet.create({
  viewBtn: {
    position: "absolute",
    bottom: 0,
    height: AppHeight(100 / 3),
    width: AppWidth(100),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
