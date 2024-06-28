import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomHeader from "../../../../components/CustomHeader";
import { CustomIcon } from "../../../../components/CustomIcon";
import { Box, HStack, VStack, Text, Spacer } from "native-base";
import {
  COLORS,
  fontSize,
  AppWidth,
  AppHeight,
  truncateString,
} from "../../../../utils";
import CustomButton from "../../../../components/CustomButton";
import { useTranslation } from "react-i18next";

const WithdrawFund = ({ route, navigation }) => {
  const { bankName, phone, bank_account, currency } = route.params;
  const { t } = useTranslation();

  const onPressNotification = () => {

  };

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

  const onPressWithdraw = () => {
    navigation.navigate("WithdrawSuccess", {
      bankName,
      phone,
      bank_account,
      currency,
    });
  };

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader
        title={t("add_bank_title")}
        icon
        back
        navigation={navigation}
        onPressNotification={onPressNotification}
      />

      <View style={{ paddingHorizontal: 15 }}>
        <Text
          style={{ color: COLORS.black, fontWeight: "bold", marginTop: 20 }}
        >
          {t("withdraw_fund_title")}
        </Text>
        {/* Edit Amount Section */}

        <Box borderBottomWidth="0.4" borderColor={COLORS.grey} py="5">
          <Text
            style={{
              color: COLORS.grey,
              fontSize: 12,
            }}
          >
            {t("amount")}
          </Text>
          <HStack space={3} justifyContent="space-between">
            <View style={{ marginTop: 5 }}>
              <CustomIcon name="withdrawAmount" />
            </View>
            <VStack>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: "bold",
                  fontSize: fontSize.subHeader,
                }}
              >
                AED {currency}
              </Text>
            </VStack>
            <Spacer />

            <TouchableOpacity
              style={{ marginTop: 5 }}
              onPress={() =>
                navigation.navigate("EditAmount", {
                  bankName,
                  phone,
                  bank_account,
                })
              }
            >
              <CustomIcon name="editIcon" />
            </TouchableOpacity>
          </HStack>
        </Box>

        {/* Bank Amount Section */}

        <Box borderBottomWidth="0.4" borderColor={COLORS.grey} py="5">
          <Text style={{ color: COLORS.grey, marginBottom: 10 }}>
            {t("to")}
          </Text>
          <HStack space={3} justifyContent="space-between">
            <View style={{ marginTop: 5 }}>
              <CustomIcon name="bacnkIcon" />
            </View>
            <VStack>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: "bold",
                  fontSize: fontSize.subHeader,
                }}
              >
                {truncateString(bankName, 15)}
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 12,
                }}
              >
                {bankName}
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 12,
                }}
              >
                {bank_account}
              </Text>
            </VStack>
            <Spacer />

            <TouchableOpacity
              style={{ marginTop: 5 }}
              onPress={() => navigation.navigate("AddBank")}
            >
              <CustomIcon name="editIcon" />
            </TouchableOpacity>
          </HStack>
        </Box>

        {/* Wallet Amount Section */}

        <Box borderBottomWidth="0.4" borderColor={COLORS.grey} py="5">
          <Text style={{ color: COLORS.grey, marginBottom: 10 }}>
            {t("from")}
          </Text>
          <HStack space={3} justifyContent="space-between">
            <View style={{ marginTop: 5 }}>
              <CustomIcon name="waletIcon" />
            </View>
            <VStack>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: "bold",
                  fontSize: fontSize.subHeader,
                }}
              >
                Mumtaz Tech Wallet
              </Text>

              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 12,
                }}
              >
                Available Balance:
              </Text>
            </VStack>
            <Spacer />

            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                AED 12,655.50
              </Text>
            </View>
          </HStack>
        </Box>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ color: COLORS.grey }}>{t("transaction_fee")}</Text>
          <Text style={{ color: COLORS.grey }}>AED 5.00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: fontSize.subHeader }}>
            {t("total")}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: fontSize.subHeader }}>
            {currency}
          </Text>
        </View>
      </View>

      <View style={styles.viewBtn}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: COLORS.grey }}>{t("total")}</Text>
            <Text style={{ fontWeight: "bold", fontSize: fontSize.subHeader }}>
              {currency}
            </Text>
          </View>

          <View>
            <CustomButton
              title={t("Withdraw")}
              width={AppWidth(55)}
              height={40}
              fontSize={14}
              top={8}
              onPress={onPressWithdraw}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WithdrawFund;

const styles = StyleSheet.create({
  viewBtn: {
    position: "absolute",
    bottom: 0,
    height: AppHeight(100 / 4),
    width: AppWidth(100),
    justifyContent: "center",
    paddingHorizontal: 15,
  },
});
