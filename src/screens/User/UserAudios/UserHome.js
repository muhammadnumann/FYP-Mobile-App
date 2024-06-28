import { StyleSheet, View } from "react-native";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";
import { ScreenHeight } from "../../../utils";
import AudioTabs from "./AudioTabs";
import EmptyScreen from "../../../components/EmptyScreen";
import { useToast } from "native-base";
import SuccessToast from "../../../components/Toast/SuccessToast";
import { useTranslation } from "react-i18next";

const UserHome = ({ route, navigation }) => {
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
        ProfileInfo={[]}
        navigation={navigation}
        onCancel={onCancel}
        indexNumber={index}
      />
    </View>
  );
};

export default UserHome;

const styles = StyleSheet.create({});
