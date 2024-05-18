import { StyleSheet, View } from "react-native";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";
import { sampleListData, ScreenHeight } from "../../../utils";
import AudioTabs from "./AudioTabs";
import EmptyScreen from "../../../components/EmptyScreen";
import { useToast } from "native-base";
import SuccessToast from "../../../components/Toast/SuccessToast";
import { useTranslation } from "react-i18next";

const UserBookingHome = ({ route, navigation }) => {
  const toast = useToast();
  const { t } = useTranslation();
  const index = 1;
  const onPressNotification = () => {
    navigation.navigate("UserNotification");
  };

  const onCancel = () => {
    SuccessToast(t("Success"), t("booking_cancel_msg"));
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        height: ScreenHeight,
      }}
    >
      <CustomHeader
        title={t("my_audios")}
        icon
        back
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      <AudioTabs
        ProfileInfo={sampleListData}
        navigation={navigation}
        onCancel={onCancel}
        indexNumber={index}
      />
      {/* <EmptyScreen
        source={require("../../../../assets/EmptyBooking.png")}
        subTitle={"It seems like you haven’t booked any service yet!"}
        buttonName="Booking"
        // onNavigate={() => navigation.navigate("AddAddress")}
        height={137}
        width={208} 
      /> */}
    </View>
  );
};

export default UserBookingHome;

const styles = StyleSheet.create({});
