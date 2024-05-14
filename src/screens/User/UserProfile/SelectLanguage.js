import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../../../components/CustomHeader";
import {
  AppHeight,
  changeLanguage,
  COLORS,
  fontSize,
  normalize,
  ScreenHeight,
  ScreenWidth,
} from "../../../utils";
import { useTranslation } from "react-i18next";
import { Radio, Stack } from "native-base";
import CustomButton from "../../../components/CustomButton";

const SelectLanguage = ({ navigation }) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [selectLanguage, setSelectedLanguage] = useState(i18n.language);

  const onSelectChange = () => {
    changeLanguage(selectLanguage, i18n);
    navigation.navigate("Home");
  };

  const onLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const onPressNotification = () => {
    navigation.navigate("UserProfileHome", { screen: "UserNotification" });
  };

  return (
    <View style={{ backgroundColor: COLORS.white, height: AppHeight(100) }}>
      <CustomHeader
        title={t("select") + " " + t("language")}
        back
        navigation={navigation}
        icon
        onPressNotification={onPressNotification}
      />
      <ScrollView style={{ marginBottom: AppHeight(14) }}>
        <View style={{ paddingHorizontal: 15, marginTop: AppHeight(5) }}>
          <Radio.Group
            name="exampleGroup"
            defaultValue={selectLanguage}
            accessibilityLabel="favorite colorscheme"
          >
            <Stack
              direction={{
                base: "column",
                md: "column",
              }}
              alignItems={{
                base: "flex-start",
                md: "center",
              }}
              space={4}
              w="75%"
              maxW="300px"
            >
              <Radio
                value={"en"}
                colorScheme="blue"
                size="sm"
                selected={selectLanguage === "en"}
                my={1}
                onPress={() => onLanguageChange("en")}
              >
                {t("english")}
              </Radio>
              <Radio
                value="ar"
                colorScheme="blue"
                selected={selectLanguage === "ar"}
                size="sm"
                my={1}
                onPress={() => onLanguageChange("ar")}
              >
                {t("arabic")}
              </Radio>
            </Stack>
          </Radio.Group>
        </View>

        <View style={styles.viewBtn}>
          <CustomButton title={t("change_language")} onPress={onSelectChange} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontWeight: "bold",
    paddingVertical: 5,
    marginTop: 25,
    fontSize: fontSize.title,
  },
  subText: {
    color: COLORS.grey,
    textAlign: "justify",
    paddingVertical: 10,
    fontSize: fontSize.mini,
  },
  viewBtn: {
    bottom: 0,
    height: ScreenHeight * 1,
    width: ScreenWidth * 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
