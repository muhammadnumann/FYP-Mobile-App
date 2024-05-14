import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../utils";
import { BackArrow } from "../../utils/SvgIcon";
import { useTranslation } from "react-i18next";

const Header = ({ currentSlideIndex, goToBackSlide, skip }) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={{ marginTop: 20 }}>
      {currentSlideIndex === 0 ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View></View>
          <TouchableOpacity onPress={skip}>
            <Text style={{ color: COLORS.grey }}>{t("Skip")}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={goToBackSlide}>
            <BackArrow height={15} width={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={skip}>
            <Text style={{ color: COLORS.grey }}>{t("Skip")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
