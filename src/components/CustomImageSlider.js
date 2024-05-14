import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  AppFontSize,
  AppHeight,
  AppWidth,
  COLORS,
  fontSize,
  ScreenHeight,
  ScreenWidth,
} from "../utils";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "./CustomButton";
import { useTranslation } from "react-i18next";
import { API_URL } from "../services/ApiConstants";

const CustomImageSlider = ({ onPressBook, data }) => {
  // const [data, SetData] = useState([1, 1, 1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  return (
    <View>
      <View
        style={{
          height: ScreenHeight / 4.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex((x / ScreenWidth).toFixed(0));
          }}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: AppWidth(100),
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <ImageBackground
                  source={{
                    uri: API_URL + "/uploads/" + item.image,
                  }}
                  imageStyle={{ borderRadius: 12 }}
                  style={{
                    width: AppWidth(90),
                    height: AppHeight(20),
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
                      height: AppHeight(20),
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
                            width:AppWidth(50)
                          }}
                        >
                          {item?.description}
                        </Text>

                        {/* <CustomButton
                          title={t("book_now")}
                          height={AppHeight(4.5)}
                          width={AppWidth(30)}
                          fontSize={AppFontSize(1.4)}
                          top={AppHeight(1.3)}
                          onPress={onPressBook}
                        /> */}
                      </View>

                      <View >
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

      {/* slider animation  */}

      <View
        style={{
          flexDirection: "row",
          width: ScreenWidth,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data?.map((item, index) => {
          return (
            <View
              style={{
                width: currentIndex == index ? 30 : 8,
                height: currentIndex == index ? 10 : 8,
                borderRadius: currentIndex == index ? 5 : 4,
                backgroundColor:
                  currentIndex == index
                    ? COLORS.primary
                    : COLORS.primaryLighter,
                marginLeft: 5,
              }}
              key={index}
            ></View>
          );
        })}
      </View>
    </View>
  );
};

export default CustomImageSlider;

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
    fontSize: 12,
  },
  discountBackground: {
    backgroundColor: COLORS.primary,
    backgroundColor: `rgba(98, 106, 255, 0.7)`,
    height: AppHeight(13),
    width: 85,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    marginRight: 20,
  },
});
