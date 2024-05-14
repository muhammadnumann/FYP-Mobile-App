import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../../components/CustomHeader";
import { CustomIcon } from "../../../components/CustomIcon";
import WalletChart from "../../../components/Charts/WalletChart";
import { AppHeight, AppWidth, COLORS, fontSize } from "../../../utils";
import CustomButton from "../../../components/CustomButton";
import CustomBorderButton from "../../../components/CustomBorderButton";
import { Box, HStack, VStack, Text, Spacer, Image } from "native-base";
import { useTranslation } from "react-i18next";

const transactionButtons = [
  { name: "All" },
  { name: "Withdraw" },
  { name: "Spending" },
];

const WithdrawList = [
  { title: "Withdraw", price: "AED 500.00", time: "10:34PM" },
  { title: "Withdraw", price: "AED 1435.50", time: "8:16PM" },
  { title: "Withdraw", price: "AED 500.00", time: "9:40AM" },
];

const EarnedList = [
  { title: "Spending", price: "AED 500.00", time: "10:34PM" },
  { title: "Spending", price: "AED 1435.50", time: "8:16PM" },
  { title: "Spending", price: "AED 500.00", time: "9:40AM" },
];

const AllTransactionList = [
  { title: "Withdraw", price: "AED 500.00", time: "10:34PM" },
  { title: "Spending", price: "AED 1435.50", time: "8:16PM" },
  { title: "Withdraw", price: "AED 500.00", time: "9:40AM" },
];

const Wallet = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState("All");
  const { t } = useTranslation();

  const CheckedArrow = (btnName) => {
    if (btnName === "Withdraw") {
      return "arrowUpWhite";
    } else if (btnName === "Spending") {
      return "arrowDownWhite";
    } else {
      return null;
    }
  };

  const UnCheckedArrow = (btnName) => {
    if (btnName === "Withdraw") {
      return "arrowUpBlue";
    } else if (btnName === "Spending") {
      return "arrowDownBlue";
    } else {
      return null;
    }
  };

  const renderTransactionButtons = () => {
    const t_buttons = transactionButtons.map((btn, index) => {
      if (selectedButton === btn.name) {
        return (
          <View key={index}>
            <CustomButton
              title={t(btn.name)}
              width={AppWidth(27)}
              height={45}
              fontSize={14}
              top={1}
              onPress={() => setSelectedButton(btn.name)}
              iconName={CheckedArrow(btn.name)}
            />
          </View>
        );
      } else {
        return (
          <View key={index}>
            <CustomBorderButton
              title={t(btn.name)}
              width={AppWidth(27)}
              height={45}
              fontSize={14}
              top={1}
              onPress={() => setSelectedButton(btn.name)}
              iconName={UnCheckedArrow(btn.name)}
            />
          </View>
        );
      }
    });

    return t_buttons;
  };

  const renderTransactionHistory = () => {
    if (selectedButton === "Withdraw") {
      return WithdrawList.map((item, index) => (
        <Box
          borderBottomWidth="0.4"
          borderColor={COLORS.grey}
          py="2"
          key={index}
        >
          <TouchableOpacity onPress={() => onNavigation(item)}>
            <HStack space={3} justifyContent="space-between">
              <View style={{ marginTop: 5 }}>
                <CustomIcon name="arrowUpRed" />
              </View>
              <VStack>
                <Text
                  style={{
                    color:
                      item.title === "Withdraw" ? COLORS.red : COLORS.primary,
                    fontWeight: "bold",
                  }}
                >
                  {item.price}
                </Text>
                <Text
                  style={{
                    color: COLORS.grey,
                    fontSize: 12,
                  }}
                >
                  {t(item.title)}
                </Text>
              </VStack>
              <Spacer />

              <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                {item.time}
              </Text>
            </HStack>
          </TouchableOpacity>
        </Box>
      ));
    } else if (selectedButton === "Spending") {
      return EarnedList.map((item, index) => (
        <Box
          borderBottomWidth="0.4"
          borderColor={COLORS.grey}
          py="2"
          key={index}
        >
          <TouchableOpacity onPress={() => onNavigation(item)}>
            <HStack space={3} justifyContent="space-between">
              <View style={{ marginTop: 5 }}>
                <CustomIcon name="arrowDownBlue" />
              </View>
              <VStack>
                <Text
                  style={{
                    color:
                      item.title === "Withdraw" ? COLORS.red : COLORS.primary,
                    fontWeight: "bold",
                  }}
                >
                  {item.price}
                </Text>
                <Text
                  style={{
                    color: COLORS.grey,
                    fontSize: 12,
                  }}
                >
                  {t(item.title)}
                </Text>
              </VStack>
              <Spacer />

              <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                {item.time}
              </Text>
            </HStack>
          </TouchableOpacity>
        </Box>
      ));
    } else {
      return AllTransactionList.map((item, index) => (
        <Box
          borderBottomWidth="0.4"
          borderColor={COLORS.grey}
          py="2"
          key={index}
        >
          <TouchableOpacity>
            <HStack space={3} justifyContent="space-between">
              <View style={{ marginTop: 5 }}>
                {item.title === "Withdraw" ? (
                  <CustomIcon name="arrowUpRed" />
                ) : (
                  <CustomIcon name="arrowDownBlue" />
                )}
              </View>
              <VStack>
                <Text
                  style={{
                    color:
                      item.title === "Withdraw" ? COLORS.red : COLORS.primary,
                    fontWeight: "bold",
                  }}
                >
                  {item.price}
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {t(item.title)}
                </Text>
              </VStack>
              <Spacer />

              <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                {item.time}
              </Text>
            </HStack>
          </TouchableOpacity>
        </Box>
      ));
    }
  };

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader title={t("My Wallet")} back navigation={navigation} />

      <ScrollView>
        <View style={{ paddingHorizontal: 15 }}>
          <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <CustomIcon name="earningIcon" />
              <Text style={{ fontWeight: "600", marginLeft: 5 }}>
                {t("total_spendings")}
              </Text>
            </View>

            <Text
              style={{
                fontSize: fontSize.large,
                fontWeight: "bold",
                paddingVertical: 15,
              }}
            >
              AED 8,635.00
            </Text>

            <CustomButton
              title={t("add_funds")}
              width={"37%"}
              height={45}
              fontSize={14}
              top={8}
              iconName="arrowUpWhite"
              // onPress={() => navigation.navigate("AddBank")}
              onPress={() => navigation.navigate("CheckoutScreen")}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{t("spending_stats")}</Text>
            <TouchableOpacity>
              <CustomIcon name="chartFilterIcon" />
            </TouchableOpacity>
          </View>

          <WalletChart />

          <View>
            <Text style={{ fontWeight: "bold", paddingVertical: 10 }}>
              {t("Recent Transactions")}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {renderTransactionButtons()}
            </View>
            <View style={{ height: AppHeight(35) }}>
              {renderTransactionHistory()}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: 10,
    borderRadius: 12,
    marginTop: 20,
  },
});
