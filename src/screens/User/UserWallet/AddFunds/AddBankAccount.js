import React, { useState } from "react";
import { Keyboard, Platform, StyleSheet, Text, View } from "react-native";

import {
  AppHeight,
  AppWidth,
  COLORS,
  ScreenHeight,
  ScreenWidth,
} from "../../../../utils";
import CustomHeader from "../../../../components/CustomHeader";
import CustomPhoneInput from "../../../../components/CustomPhoneInput";
import CustomInput from "../../../../components/CustomInput";
import { CustomIcon } from "../../../../components/CustomIcon";
import CustomButton from "../../../../components/CustomButton";
import CustomBorderButton from "../../../../components/CustomBorderButton";
import { useTranslation } from "react-i18next";

const AddBankAccount = ({ route, navigation }) => {
  const { bankName } = route.params;

  const [inputs, setInputs] = useState({
    number: "",
    bank_account: "",
  });
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  React.useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
        },
      });
  }, [navigation]);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const onPressNotification = () => {
    navigation.navigate("UserNotification");
  };

  const onPressAddAccount = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.number) {
      handleError(t("number_input_err_msg"), "number");
      isValid = false;
    }

    if (!inputs.bank_account) {
      handleError(t("add_bank_err_msg"), "bank_account");
      isValid = false;
    }
    if (isValid) {
      navigation.navigate("EditAmount", {
        bankName: bankName,
        phone: inputs.number,
        bank_account: inputs.bank_account,
      });
    }
  };

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader
        title={t("add_funds")}
        icon
        back
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ fontWeight: "bold", paddingVertical: 10 }}>
          {t("add_funds_title")}
        </Text>
        <Text style={{ color: COLORS.grey, marginTop: 20 }}>
          {t("mobile_input_title")}{" "}
        </Text>

        <View style={{ marginTop: 30 }}>
          <CustomPhoneInput
            handleOnchange={handleOnchange}
            handleError={handleError}
            // setStates={setStates}
            error={errors.number}
            name="number"
          />
        </View>

        <Text style={{ color: COLORS.grey, marginTop: 50 }}>
          {t("bank_account_input_title")}
        </Text>

        <CustomInput
          onChangeText={(text) => handleOnchange(text, "bank_account")}
          onFocus={() => handleError(null, "bank_account")}
          IconName={"bank_account"}
          placeholder="XXXXXXXXXXXXXX"
          error={errors.bank_account}
          name="bank_account"
        />

        <View
          style={{
            borderWidth: 1,
            borderColor: "#A3A3A3",
            marginTop: 15,
          }}
        />

        <Text style={{ fontWeight: "bold", marginTop: 20 }}>
          {t("bank_format")}
        </Text>
        <Text style={{ color: COLORS.grey, paddingVertical: 10 }}>
          For Bank ABC
        </Text>

        <CustomIcon name="bankFormatIcon" />
      </View>

      <View style={styles.viewBtn}>
        <CustomButton
          title={t("add_account_btn")}
          top={8}
          onPress={onPressAddAccount}
        />
        <CustomBorderButton title={t("cancel")} width={AppWidth(90)} top={1} />
      </View>
    </View>
  );
};

export default AddBankAccount;

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
