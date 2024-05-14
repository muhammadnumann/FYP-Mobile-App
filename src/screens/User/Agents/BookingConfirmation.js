import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { COLORS, ScreenHeight } from "../../../utils";
import EmptyScreen from "../../../components/EmptyScreen";
import { useToast } from "native-base";
import SuccessToast from "../../../components/Toast/SuccessToast";
import CustomHeader from "../../../components/CustomHeader";
import { useTranslation } from "react-i18next";

const BookingConfirmation = ({ route, navigation }) => {
  const { status } = route.params;
  const toast = useToast();
  const { t } = useTranslation();
  useEffect(() => {
    const timerId = setTimeout(() => {
      navigation.navigate("UserHome");
      if (status) {
        SuccessToast(t("Success"), "Booking added successfully");
      }
    }, 5000);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <View style={{ height: ScreenHeight, backgroundColor: COLORS.white }}>
      <CustomHeader title={t("confirmation")} back navigation={navigation} />
      <EmptyScreen
        source={
          status === true
            ? require("../../../../assets/confirmSuccess.png")
            : require("../../../../assets/confirmUnSuccess.png")
        }
        subTitle={status === true ? t("booking_success") : t("booking_failure")}
        buttonName={t("more_services")}
        onNavigate={() => navigation.navigate("UserHome")}
        height={192.8}
        width={208}
      />
    </View>
  );
};

export default BookingConfirmation;

const styles = StyleSheet.create({});
