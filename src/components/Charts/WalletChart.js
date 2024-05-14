import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { AppHeight, AppWidth, COLORS } from "../../utils";
import { useTranslation } from "react-i18next";

const barData = [
  {
    value: 40,
    label: "Jan",
    spacing: 20,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.chartComplete,
  },

  {
    value: 50,
    label: "Feb",
    spacing: 20,
    labelWidth: 30,
    labelTextStyle: { color: "grey" },
    frontColor: COLORS.chartComplete,
  },

  {
    value: 75,
    label: "Mar",
    spacing: 20,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.chartComplete,
  },

  {
    value: 30,
    label: "Apr",
    spacing: 20,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.chartComplete,
  },

  {
    value: 60,
    label: "May",
    spacing: 20,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.chartComplete,
  },

  {
    value: 65,
    label: "Jun",
    spacing: 20,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.chartComplete,
  },
];

const WalletChart = () => {
  const { t } = useTranslation();
  const renderTitle = () => {
    return (
      <View style={{ marginVertical: AppHeight(2) }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                backgroundColor: COLORS.chartComplete,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                color: COLORS.grey,
              }}
            >
              {t("spendings")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        borderRadius: 10,
        width: AppWidth(92),
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
      }}
    >
      <BarChart
        data={barData}
        // barWidth={20}
        // spacing={24}
        // roundedTop
        // roundedBottom
        hideRules
        xAxisThickness={1}
        yAxisThickness={1}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={3}
        height={AppHeight(15)}
        width={AppWidth(78)}
        maxValue={75}
        // barStyle={{ width: 20 }}
      />

      {renderTitle()}
    </View>
  );
};

export default WalletChart;
