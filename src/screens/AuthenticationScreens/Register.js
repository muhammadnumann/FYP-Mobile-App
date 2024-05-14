import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import AuthHeader from "../../components/AuthHeader";
import CustomButton from "../../components/CustomButton";
import { CustomIcon } from "../../components/CustomIcon";
import CustomInput from "../../components/CustomInput";
import DatePicker from "../../components/DatePicker";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import {
  AppFontSize,
  AppHeight,
  COLORS,
  fontSize,
  userGender,
  userType,
} from "../../utils";
import { country_list } from "../../utils/country_state";
import CustomCountryPickerModal from "../../components/CustomCountryPickerModal";
import { CustomSelect } from "../../components/CustomSelect";
import CustomDropdown from "../../components/CustomDropdown";
import { postRequest } from "../../services/ApiServices";
import {
  REGISTER_URL,
  SEND_CODE_URL,
  VERIFY_PHONE_RG_URL,
} from "../../services/ApiConstants";
import WarnToast from "../../components/Toast/WarnToast";
import { useDispatch } from "react-redux";
import { useToast } from "native-base";
import SuccessToast from "../../components/Toast/SuccessToast";
import SelectButton from "../../components/SelectButton";
import { Radio, Stack } from "native-base";
import { useTranslation } from "react-i18next";
import SelectLanguageModal from "../../components/Modals/SelectLanguageModal";
import moment from "moment";
import { handleLogin } from "../../store/AuthActions";

const Register = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    number: "",
    dob: "",
    gender: "",
    fullname: "",
    email: "",
    number: "",

  });
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    console.log(inputs)
    if (!inputs.fullname) {
      handleError(t("fullname_input_err_msg"), "fullname");
      isValid = false;
    }
    if (!inputs.number) {
      handleError(t("number_input_err_msg"), "number");
      isValid = false;
    }
    if (!inputs.email) {
      handleError(t('email_input_err_msg'), 'email');
      isValid = false;
    }
    if (!inputs.dob) {
      handleError(t("dob_input_err_msg"), "dob");
      isValid = false;
    }
    if (!inputs.gender) {
      handleError(t("gender_input_err_msg"), "gender");
      isValid = false;
    }
    if (!inputs.newPassword) {
      handleError(t("new_password_input_err_msg"), "newPassword");
      isValid = false;
    }
    if (!inputs.confirmPassword) {
      handleError(t("confirm_password_input_err_msg"), "confirmPassword");
      isValid = false;
    }
    if (isValid) {
      onRegister();
    }
  };

  const onRegister = async () => {
    setLoading(true);
    let sendingData = {
      email: inputs.email,
      password: inputs.newPassword,
      accountName: inputs.fullname,
      age: inputs.dob,
      gender: inputs.gender,
      phoneNo: inputs.number,
    };

    try {
      let response = await postRequest(REGISTER_URL, sendingData);
      let sendingResponse = JSON.stringify(response);
      console.log(response)
      console.log(inputs);

      if (response.success) {
        SuccessToast(t("Success"), response.message);
        dispatch(handleLogin(response));
      } else {
        WarnToast(t("Error"), response.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
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

  const onPressCountry = () => {
    navigation.navigate("country", {
      handleOnchange,
      handleError,
      name: "country",
    });
  };

  const onPressState = () => {
    navigation.navigate("state", {
      handleOnchange,
      handleError,
      name: "state",
      countryId: inputs.countryId,
    });
  };

  const onPressCity = () => {
    navigation.navigate("city", {
      handleOnchange,
      handleError,
      name: "city",
      stateId: inputs.stateId,
    });
  };

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView horizontal={false}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
            <View
              style={{ alignSelf: "center", paddingVertical: AppHeight(4) }}
            >
              <CustomIcon name={"RegisterIcon"} />
            </View>

            <AuthHeader title={t("register_title")} alignText={"center"} />

            <View style={{ marginVertical: 20 }}>

              <CustomInput
                onChangeText={(text) => handleOnchange(text, "fullname")}
                onFocus={() => handleError(null, "fullName")}
                IconName={"role"}
                placeholder={"Full Name"}
                error={errors.fullName}
              />

              <CustomInput
                onChangeText={(text) => handleOnchange(text, "email")}
                onFocus={() => handleError(null, "email")}
                IconName={"email"}
                placeholder={'Email'}
                error={errors.email}
              />

              <DatePicker
                placeholder={'Date of Birth'}
                IconName='DateIcon'
                handleOnchange={handleOnchange}
                error={errors.dob}
                handleError={handleError}
                name='dob'
                value={inputs.dob}
              />

              <CustomPhoneInput
                handleOnchange={handleOnchange}
                handleError={handleError}
                // setStates={setStates}
                error={errors.phoneNumber}
                name="number"
              />

              <CustomDropdown
                mode='date'
                data={userGender}
                placeholder={t('select_gender')}
                IconName='role'
                handleOnchange={handleOnchange}
                error={errors.gender}
                handleError={handleError}
                name='gender'
                value={inputs.gender}
              />
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


              <View
                style={{
                  flexDirection: "row",
                  padding: 15,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{ fontSize: AppFontSize(1.5), color: COLORS.grey }}
                >
                  {t("register_term_line")}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: 700,
                      fontSize: AppFontSize(1.5),
                    }}
                  >
                    {t("terms_condition")}
                  </Text>
                </TouchableOpacity>
              </View>

              <CustomButton
                title={t("register")}
                onPress={validate}
                top={AppHeight(1)}
                loading={loading}
              />

              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text
                  style={{
                    color: COLORS.grey,
                    fontWeight: 400,
                    textAlign: "center",
                    fontSize: fontSize.mini,
                  }}
                >
                  {t("register_base_line")}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: 700,
                      fontSize: fontSize.mini,
                    }}
                  >
                    {t("login_btn")}!
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: 700,
                    fontSize: fontSize.mini,
                    textAlign: "center",
                  }}
                >
                  {t("change_language")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      <SelectLanguageModal showModal={showModal} setShowModal={setShowModal} />
    </SafeAreaView>
  );
};

export default Register;
