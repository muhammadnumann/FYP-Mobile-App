import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import CustomHeader from "../../../../components/CustomHeader";
import { AppHeight, COLORS } from "../../../../utils";
import CustomJobCard from "../../../../components/Cards/CustomJobCard";
import CustomButton from "../../../../components/CustomButton";
import BillSummaryCard from "../../../../components/Cards/BillSummaryCard";
import { useToast } from "native-base";
import SuccessToast from "../../../../components/Toast/SuccessToast";
import { useTranslation } from "react-i18next";

const ServiceReceipt = ({ route, navigation }) => {
  const { data } = route.params;
  const toast = useToast();
  const { t } = useTranslation();

  const onPressPaymentRequest = () => {
    SuccessToast(t("Success"), t("payment_sent_msg"));
    navigation.navigate("Dashboard");
  };

  useEffect(() => {
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

  return (
    <View
      style={{
        height: AppHeight(100),
        backgroundColor: COLORS.white,
      }}
    >
      <CustomHeader title="Servie Receipt" back navigation={navigation} />

      <ScrollView>
        <CustomJobCard
          data={data}
          status={"Completed"}
          index={1}
          receipt={true}
          // onButtonPress={() => setVisible(!visible)}
        />

        <BillSummaryCard data={data} />

        <View style={{ paddingHorizontal: 15, paddingBottom: AppHeight(5) }}>
          <Text
            style={{
              color: COLORS.grey,
              textAlign: "center",
              paddingVertical: 10,
            }}
          >
            We have sent a copy of this bill to your email id
          </Text>
          <Text style={{ color: COLORS.primary, textAlign: "center" }}>
            adamswhite@email.com
          </Text>
          <CustomButton
            title="Request Payment"
            width={"100%"}
            onPress={onPressPaymentRequest}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ServiceReceipt;

const styles = StyleSheet.create({});
