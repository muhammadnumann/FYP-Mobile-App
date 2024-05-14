import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { AppHeight, AppWidth, COLORS } from "../../utils";
import { useTranslation } from "react-i18next";

// const barData = [
//   {
//     value: 40,
//     label: "Jan",
//     spacing: 2,
//     labelWidth: 30,
//     labelTextStyle: { color: "gray" },
//     frontColor: COLORS.chartComplete,
//   },
//   { value: 20, frontColor: COLORS.chartCancel },
//   {
//     value: 50,
//     label: "Feb",
//     spacing: 2,
//     labelWidth: 30,
//     labelTextStyle: { color: "grey" },
//     frontColor: COLORS.chartComplete,
//   },
//   { value: 40, frontColor: COLORS.chartCancel },
//   {
//     value: 75,
//     label: "Mar",
//     spacing: 2,
//     labelWidth: 30,
//     labelTextStyle: { color: "gray" },
//     frontColor: COLORS.chartComplete,
//   },
//   { value: 25, frontColor: COLORS.chartCancel },
//   {
//     value: 30,
//     label: "Apr",
//     spacing: 2,
//     labelWidth: 30,
//     labelTextStyle: { color: "gray" },
//     frontColor: COLORS.chartComplete,
//   },
//   { value: 20, frontColor: COLORS.chartCancel },
//   {
//     value: 60,
//     label: "May",
//     spacing: 2,
//     labelWidth: 30,
//     labelTextStyle: { color: "gray" },
//     frontColor: COLORS.chartComplete,
//   },
//   { value: 40, frontColor: COLORS.chartCancel },
//   {
//     value: 65,
//     label: "Jun",
//     spacing: 2,
//     labelWidth: 30,
//     labelTextStyle: { color: "gray" },
//     frontColor: COLORS.chartComplete,
//   },
//   { value: 30, frontColor: COLORS.chartCancel },
// ];

const JobStatsBarChart = ({barData}) => {
  const { t } = useTranslation();
  const renderTitle = () => {
    return (
      <View style={{ marginVertical: AppHeight(1.3) }}>
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
                height: 16,
                color: COLORS.grey,
              }}
            >
              {t("Completed")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                backgroundColor: COLORS.chartCancel,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                height: 16,
                color: COLORS.grey,
              }}
            >
              {t("Cancelled")}
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
        barWidth={20}
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
        // maxValue={75}
        barStyle={{ width: 24 }}
      />

      {renderTitle()}
    </View>
  );
};

export default JobStatsBarChart;
