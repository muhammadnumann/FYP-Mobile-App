import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useToast } from "native-base";
import SuccessToast from "../../../components/Toast/SuccessToast";
import CustomHeader from "../../../components/CustomHeader";
import BillSummaryCard from "../../../components/Cards/BillSummaryCard";
import CustomButton from "../../../components/CustomButton";
import { AppHeight, COLORS } from "../../../utils";
import CreditCardInfo from "../../../components/Cards/CreditCardInfo";
import { useTranslation } from "react-i18next";
import CustomCheckBox from "../../../components/CustomCheckBox";
import { CustomIcon } from "../../../components/CustomIcon";

const SpPaymentMethod = ({ route, navigation }) => {
  const toast = useToast();
  const { t } = useTranslation();
  const [method, setMethod] = useState("creditCard");

  const onPressPaymentRequest = () => {
    // navigation.navigate("Dashboard");
    if (method !== "creditCard") {
      navigation.navigate("AddFundBank");
    } else {
      SuccessToast(t("Success"), t("payment_sent_msg"));
    }
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        height: Platform.OS === "ios" ? 80 : 60,
      });
  }, [navigation]);

  const handleCheckBox = (value) => {
    setMethod(value);
  };

  return (
    <View
      style={{
        height: AppHeight(100),
        backgroundColor: COLORS.white,
      }}
    >
      <CustomHeader title={t("payment_method")} back navigation={navigation} />

      <ScrollView>
        {/* <BillSummaryCard /> */}
        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
          <Text style={{ fontWeight: "bold" }}>
            {t("payment_method_title")}
          </Text>
        </View>
        <CreditCardInfo method={method} setMethod={handleCheckBox} />

        <View style={{ paddingHorizontal: 15 }}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 15,
              borderColor: COLORS.lightGrey,
            }}
          >
            <CustomCheckBox
              isChecked={method === "cash"}
              onPress={() => handleCheckBox("cash")}
            />

            <View style={{ marginLeft: 10 }}>
              <CustomIcon name={"handCash"} />
            </View>

            <Text
              style={{ color: COLORS.black, padding: 5, fontWeight: "bold" }}
            >
              {t("bank_payment")}
            </Text>
          </View>
        </View>

        <CustomButton
          title={t("pay_now")}
          width={"90%"}
          center
          onPress={onPressPaymentRequest}
        />
      </ScrollView>
    </View>
  );
};

export default SpPaymentMethod;
