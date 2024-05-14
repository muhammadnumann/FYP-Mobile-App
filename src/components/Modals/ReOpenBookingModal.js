import React, { useState } from "react";
import { CustomModal } from "./CustomModal";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomIcon } from "../CustomIcon";
import { AppHeight, AppWidth, COLORS, fontSize } from "../../utils";
import CustomButton from "../CustomButton";
import { Text } from "native-base";
import { TextArea } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ReOpenBookingModal({
  visible,
  dismiss,
  setReview,
  onButtonPress,
  loading,
  booking,
}) {
  const { t } = useTranslation();

  return (
    <CustomModal visible={visible && visible} feedback={true}>
      <View>
        <View style={styles.header}>
          <Text style={{ fontSize: fontSize.subHeader, fontWeight: "600" }}>
            {t("Reason")}
          </Text>
          <TouchableOpacity onPress={dismiss && dismiss}>
            <CustomIcon name="modalCross" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.lightGrey,
            marginTop: 10,
          }}
        />

        <View style={{ marginTop: 10 }}>
          <TextArea
            shadow={2}
            h={20}
            placeholder={t("booking_reason")}
            w={"100%"}
            _light={{
              placeholderTextColor: "trueGray.700",
              bg: "coolGray.100",
              _hover: {
                bg: "coolGray.200",
              },
              _focus: {
                bg: "coolGray.200:alpha.70",
              },
            }}
            _dark={{
              bg: "coolGray.800",
              _hover: {
                bg: "coolGray.900",
              },
              _focus: {
                bg: "coolGray.900:alpha.70",
              },
            }}
            onChangeText={(text) => setReview(text)}
          />
        </View>

        <View style={{ alignSelf: "center" }}>
          <CustomButton
            title={t("Re Open")}
            width={AppWidth(45)}
            loading={loading}
            onPress={() => onButtonPress(booking)}
          />
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    height: AppHeight(10),
    width: AppWidth(20),
    alignSelf: "center",
    marginTop: AppHeight(2),
    borderRadius: 12,
  },
  profileName: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    fontSize: 17,
  },
  bio: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 5,
  },
});
