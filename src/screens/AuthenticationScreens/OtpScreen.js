import { StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { View, Text, SafeAreaView, Keyboard, TextInput } from "react-native";
import { AppHeight, AppWidth, COLORS } from "../../utils";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { CustomIcon } from "../../components/CustomIcon";
import AuthHeader from "../../components/AuthHeader";
import CustomBorderButton from "../../components/CustomBorderButton";
import { postRequest } from "../../services/ApiServices";
import {
  LOGIN_URL,
  REGISTER_URL,
  SEND_CODE_URL,
} from "../../services/ApiConstants";
import { useDispatch } from "react-redux";
import WarnToast from "../../components/Toast/WarnToast";
import { useToast } from "native-base";
import SuccessToast from "../../components/Toast/SuccessToast";
import { useTranslation } from "react-i18next";
import { deviceCountryCode } from "../../utils/helperFunction";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const OtpScreen = ({ route, navigation }) => {
  const [inputs, setInputs] = useState({
    emailOtp: "",
    mobileOtp: "",
  });

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [counter, setCounter] = React.useState(59);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toast = useToast();

  const { data } = route.params;

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    if (otp === "") {
      WarnToast("please add OTP");
      isValid = false;
    }
    if (isValid) {
      VerifyEmailCode();
    }
  };

  React.useEffect(() => {
    if (otp) {
      VerifyEmailCode();
    }
  }, [otp]);

  const VerifyEmailCode = async () => {
    setLoading(true);

    let phoneData = {
      phoneNumber: data.PhoneNumber,
      code: otp,
    };

    try {
      console.log("phone data: ", phoneData);
      if (data.Role === 1) {
        handleUserRegister();
      } else if (data.Role === 2) {
        handleServiceProviderRegister();
      }

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      WarnToast(t("Error"), error);
    }
  };

  const handleUserRegister = async () => {
    try {
      const registerData = {
        AcceptTerms: data.AcceptTerms,
        Title: data.Title,
        FirstName: data.FirstName,
        LastName: data.LastName,
        PhoneNumber: data.PhoneNumber,
        Role: data.Role,
        countryCode: deviceCountryCode(),
      };

      let response = await postRequest(REGISTER_URL, registerData);
      SuccessToast(t("Success"), "Account register successfuly");
      navigation.navigate("Login");

      setLoading(false);
    } catch (error) {
      console.log(error);
      WarnToast(t("Error"), error);
    }
  };

  const handleServiceProviderRegister = async () => {
    try {
      console.log("sp data: ", data);
      let response = await postRequest(REGISTER_URL, data);

      navigation.navigate("Login");

      setLoading(false);
    } catch (error) {
      console.log(error);
      WarnToast(t("Error"), error);
    }
  };

  const ResendOtp = async () => {
    setResendLoading(true);

    let sendingData = {
      phoneNumber: data.PhoneNumber,
    };
    try {
      let response = await postRequest(SEND_CODE_URL, sendingData);
      let sendingResponse = JSON.stringify(response);
      SuccessToast(t("Success"), JSON.parse(sendingResponse).message);
      setResendLoading(false);
      setCounter(59);
    } catch (error) {
      console.log(error);
      setResendLoading(false);
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
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ alignSelf: "center", paddingVertical: 30 }}>
          <CustomIcon name={"RegisterIcon"} />
        </View>

        <AuthHeader title={t("otp_header_title")} alignText={"center"} />

        <Text
          style={{
            color: COLORS.grey,
            textAlign: "center",
            paddingVertical: 15,
          }}
        >
          {t("otp_title")}
        </Text>

        <View style={{ marginVertical: 10 }}>
          <OTPInputView
            style={{
              width: AppWidth(85),
              height: 50,
              alignSelf: "center",
              color: "black",
              backgroundColor: "white",
            }}
            pinCount={6}
            editable={counter === 0 ? false : true}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            secureTextEntry={true}
            onCodeFilled={(code) => {
              setOtp(code);
            }}
          />

          <View
            style={{ flexDirection: "row", alignSelf: "center", marginTop: 10 }}
          >
            <Text>Resend OTP in</Text>
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.primary,
                marginLeft: 10,
              }}
            >
              00:{counter}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.viewBtn}>
        <CustomButton
          title="Verify"
          loading={loading}
          onPress={validate}
          disable={counter === 0 ? true : false}
        />
        <CustomBorderButton
          title={t("resend_otp")}
          top={1}
          loading={resendLoading}
          onPress={ResendOtp}
          disable={counter !== 0 ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  viewBtn: {
    bottom: 0,
    marginTop: AppHeight(100 / 5),
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: "black",
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  borderStyleBase: {
    width: 30,
    height: 45,
    color: "black",
    backgroundColor: "white",
  },

  borderStyleHighLighted: {
    borderColor: "black",
    color: "black",
    backgroundColor: "white",
  },

  underlineStyleBase: {
    backgroundColor: "white",
    height: 45,
    borderRadius: 5,
    borderWidth: 0,
    borderWidth: 1,
    borderColor: "black",
    color: "black",
  },

  underlineStyleHighLighted: {
    borderColor: "black",
    color: "black",
    backgroundColor: "white",
  },
});
