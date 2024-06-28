import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../../../components/CustomHeader";
import {
  AppHeight,
  AppWidth,
  COLORS,
  ScreenHeight,
  ScreenWidth,
} from "../../../../utils";
import CustomButton from "../../../../components/CustomButton";
import CustomBorderButton from "../../../../components/CustomBorderButton";
import CustomInput from "../../../../components/CustomInput";
import { Keyboard } from "react-native";
import { useTranslation } from "react-i18next";

const EditAmount = ({ route, navigation }) => {
  const { bankName, phone, bank_account } = route.params;

  const [inputs, setInputs] = React.useState({
    currency: "",
  });

  const [errors, setErrors] = React.useState({});
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

  const onPressWithdraw = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.currency) {
      handleError(t("add_currency_err_msg"), "currency");
      isValid = false;
    }
    if (isValid) {

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
          {t("enter_amount")}
        </Text>
        <CustomInput
          onChangeText={(text) => handleOnchange(text, "currency")}
          onFocus={() => handleError(null, "currency")}
          IconName={"currency"}
          placeholder="0.00"
          error={errors.currency}
          name={"currency"}
        />
      </View>

      <View style={styles.viewBtn}>
        <CustomButton
          title={t("add_funds")}
          top={8}
          onPress={onPressWithdraw}
        />
        <CustomBorderButton title={t("cancel")} width={AppWidth(90)} top={1} />
      </View>
    </View>
  );
};

export default EditAmount;

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
