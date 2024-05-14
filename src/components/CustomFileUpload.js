import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomBorderButton from "./CustomBorderButton";
import { AppFontSize, AppHeight, COLORS, fontSize, urlFormat } from "../utils";
import ImagePickerActionSheet from "./ActionSheet/ImagePickerActionSheet";
import { useDisclose } from "native-base";
import CustomButton from "./CustomButton";
import { useTranslation } from "react-i18next";

const CustomFileUpload = ({
  title,
  handleOnchange,
  source,
  type,
  editProfile,
  handleAddImage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { t } = useTranslation();
  let image = urlFormat(source);
  return (
    <View style={{ paddingVertical: 5 }}>
      {source ? (
        <ImageBackground
          source={{ uri: image }}
          imageStyle={{
            borderRadius: 12,
            backgroundColor: "black",
            opacity: 0.5,
          }}
          style={{
            width: "100%",
            height: editProfile ? AppHeight(20) : AppHeight(15),
            backgroundColor: editProfile ? COLORS.black : COLORS.lightGrey,
            borderRadius: 8,
          }}
        >
          {editProfile ? (
            <CustomButton
              title={t("Upload File")}
              onPress={onOpen}
              width="50%"
              height={40}
              fontSize={AppFontSize(1.5)}
              top={AppHeight(13)}
              center
            />
          ) : (
            <CustomBorderButton
              title={t("Upload File")}
              onPress={onOpen}
              width="50%"
              height={40}
              fontSize={AppFontSize(1.5)}
              top={source ? "12%" : 1}
              center
            />
          )}
        </ImageBackground>
      ) : (
        <View
          style={{
            width: "100%",
            height: editProfile ? AppHeight(20) : AppHeight(15),
            backgroundColor: editProfile ? COLORS.black : COLORS.lightGrey,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              paddingVertical: 15,
              fontWeight: "bold",
              marginTop: 10,
              fontSize: fontSize.mini,
              textAlign: "center",
            }}
          >
            {title}
          </Text>

          {editProfile ? (
            <CustomButton
              title={t("Upload File")}
              onPress={onOpen}
              width="50%"
              height={40}
              fontSize={AppFontSize(1.5)}
              top={AppHeight(13)}
              center
            />
          ) : (
            <CustomBorderButton
              title={t("Upload File")}
              onPress={onOpen}
              width="50%"
              height={40}
              fontSize={AppFontSize(1.5)}
              top={source ? "12%" : 1}
              center
            />
          )}
        </View>
      )}

      <ImagePickerActionSheet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleOnchange={handleOnchange}
        handleAddImage={handleAddImage}
        type={type}
        doctype={true}
      />
    </View>
  );
};

export default CustomFileUpload;

const styles = StyleSheet.create({});
