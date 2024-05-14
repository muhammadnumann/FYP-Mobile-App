import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { View, SafeAreaView, Keyboard } from "react-native";
import { AppHeight, AppWidth, COLORS } from "../../../utils";
import { CustomIcon } from "../../../components/CustomIcon";
import AuthHeader from "../../../components/AuthHeader";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import CustomPhoneInput from "../../../components/CustomPhoneInput";
import { useToast } from "native-base";
import WarnToast from "../../../components/Toast/WarnToast";
import SuccessToast from "../../../components/Toast/SuccessToast";
import { postRequest } from "../../../services/ApiServices";
import { SEND_CODE_URL } from "../../../services/ApiConstants";
import { useTranslation } from "react-i18next";

const ForgotPassword = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = React.useState({});
  const { t } = useTranslation();
  const toast = useToast();

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError(t("email_input_err_msg"), "email");
      isValid = false;
    }
    if (isValid) {
      onPressNext();
    }
  };

  const onPressNext = async () => {
    setLoading(true);
    let sendingData = {
      email: inputs.email,
    };

    try {
      let response = await postRequest(SEND_CODE_URL, sendingData);
      let sendingResponse = JSON.stringify(response);
      SuccessToast(t("Success"), JSON.parse(sendingResponse).message);
      setLoading(false);

      navigation.navigate("ForgotPasswordOTP", { data: sendingData });
    } catch (error) {
      console.log(error);
      setLoading(false);
      WarnToast(t("Error"), error);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
        <View style={{ alignSelf: "center", paddingVertical: 60 }}>
          <CustomIcon name={"ForgotIcon"} />
        </View>

        <AuthHeader title={t("forgot_password")} alignText={"center"} />

        <View style={{ marginVertical: 20 }}>
          <CustomInput
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            IconName={"email"}
            placeholder={t("email")}
            error={errors.email}
          />

          {/* <CustomButton title="Save" onPress={validate} /> */}
        </View>
      </View>

      <View style={styles.viewBtn}>
        <CustomButton title="Next" loading={loading} onPress={validate} />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  viewBtn: {
    bottom: 0,
    height: AppHeight(100 / 3),
    width: AppWidth(100),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
