import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../../components/CustomHeader";
import { getBearerRequest } from "../../../services/ApiServices";
import { USER_PROMOTIONS_URL } from "../../../services/ApiConstants";

import { FlatList, ImageBackground } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../components/CustomButton";
import {
  AppFontSize,
  AppHeight,
  AppWidth,
  COLORS,
  fontSize,
} from "../../../utils";

const PromotionsHome = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    promotions: null,
  });

  const { t } = useTranslation();

  useEffect(() => {
    getPromotions();
  }, []);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const getPromotions = async () => {
    try {
      let response = await getBearerRequest(USER_PROMOTIONS_URL);

      handleOnchange(response.data, "promotions");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onPressNotification = () => {
    navigation.navigate("PromotionsHome", { screen: "UserNotification" });
  };

  const onPressBook = () => {};

  return (
    <View>
      <CustomHeader
        title={t("promotions")}
        icon
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      <FlatList
        data={inputs?.promotions}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: AppWidth(100),
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              key={index}
            >
              <ImageBackground
                source={{
                  uri: "https://elearningindustry.com/wp-content/uploads/2021/01/investing-in-ld-programs-for-construction-workers.png",
                }}
                imageStyle={{ borderRadius: 12 }}
                style={{
                  width: AppWidth(90),
                  height: AppHeight(30),
                }}
              >
                <LinearGradient
                  start={{ x: 0.1, y: 0.58 }}
                  colors={[
                    "rgba(0, 0, 0, 1)",
                    "rgba(0, 0, 0, 0.6)",
                    "rgba(0, 0, 0, 0.6)",
                  ]}
                  style={{
                    position: "absolute",
                    width: AppWidth(90),
                    height: AppHeight(30),
                    borderRadius: 12,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ padding: AppWidth(5) }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "white",
                          fontSize: fontSize.mini,
                        }}
                      >
                        {item?.title}{" "}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          marginTop: 10,
                          fontSize: AppFontSize(1.5),
                        }}
                      >
                        {item?.description}
                      </Text>

                      <CustomButton
                        title={t("book_now")}
                        height={AppHeight(4.5)}
                        width={AppWidth(30)}
                        fontSize={AppFontSize(1.4)}
                        top={AppHeight(13)}
                        onPress={onPressBook}
                      />
                    </View>

                    <View>
                      <View style={styles.discountBackground}>
                        <Text style={styles.discountText}>{t("upto")}</Text>
                        <Text style={styles.discountTitle}>
                          {item?.discountValue}%
                        </Text>
                        <Text style={styles.discountText}>{t("off")}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PromotionsHome;

const styles = StyleSheet.create({
  discountTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 25,
  },

  discountText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
    fontSize: 13,
  },
  discountBackground: {
    backgroundColor: COLORS.primary,
    backgroundColor: `rgba(98, 106, 255, 0.7)`,
    height: 85,
    width: 85,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    marginRight: 20,
  },
});
