import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../../components/CustomHeader";
import { AppFontSize, AppHeight, AppWidth, COLORS } from "../../../utils";

import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import CustomButton from "../../../components/CustomButton";
import DocumentPicker from 'react-native-document-picker'
import { uploadAudioService } from "../../../services/UserServices/UserService";

const AllServices = ({ navigation, route }) => {

  const { t } = useTranslation();
  const onPressNotification = () => {
    navigation.navigate("Home", { screen: "UserNotification" });
  };
  const [audioRes, setAudioRes] = useState(undefined)
  const pickFiles = async () => {
    try {
      const file = await DocumentPicker.pickSingle()
      const res = await uploadAudioService(file)
      console.log(res?.audio)
      setAudioRes(res?.audio)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <View style={{ backgroundColor: COLORS.white, height: AppHeight(100) }}>
      <CustomHeader
        title={t("services")}
        back
        navigation={navigation}
        icon
        onPressNotification={onPressNotification}
      />
      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>

        <CustomButton
          title={"Upload New Audio File"}
          onPress={pickFiles}
        />
      </View>
      {audioRes !== undefined ?
        <View style={{
          display: "flex",
          flexDirection: "row",
          padding: AppHeight(2.5)
        }}>
          <View>
            <Text style={{ fontWeight: '700', fontSize: AppFontSize(2) }}>File Name: </Text>
            <Text style={{ fontWeight: '700', fontSize: AppFontSize(2) }}>Detection: </Text>
          </View>
          <View>
            <Text style={{ fontSize: AppFontSize(2) }}>{audioRes?.orignalFileName}</Text>
            <Text style={{ fontSize: AppFontSize(2) }}>{audioRes?.isReal === true ? "Real Audio File" : "Fake Audio File"}</Text>
          </View>
        </View> : ''
      }
    </View>
  );
};

export default AllServices;
const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  item: {
    textAlign: "center",
    fontWeight: 600,
    marginTop: 3,
    fontSize: AppFontSize(1.3),
  },
  serviceCard: {
    position: "relative",
    alignItems: "center",
    width: AppWidth(28),
    padding: AppHeight(2.5),
    marginTop: 13,
    borderWidth: 0,
    borderRadius: 12,
    borderColor: COLORS.lightGrey,
  },

  imageStyle: {
    width: AppWidth(10),
    resizeMode: "center",
  },

  viewBtn: {
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 15,
  },
});
