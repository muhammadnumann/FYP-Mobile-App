import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import CustomHeader from "../../../components/CustomHeader";
import { COLORS, ScreenHeight } from "../../../utils";
import EmptyScreen from "../../../components/EmptyScreen";

const Address = ({ navigation }) => {
  useEffect(() => {
    // if (isSuccess) {
    //   dispatch(handleRefresh(userDetails.data));
    // }

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
    <View style={{ height: ScreenHeight, backgroundColor: COLORS.white }}>
      <CustomHeader title="Address" />
      <EmptyScreen
        source={require("../../../../assets/NoAddress.png")}
        subTitle={"It seems like you haven’t added your address yet"}
        buttonName="Add Address"
        onNavigate={() => navigation.navigate("AddAddress")}
        height={182}
        width={208}
      />
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({});
