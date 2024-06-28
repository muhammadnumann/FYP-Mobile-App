import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";
import { StatusBar, Animated, Pressable } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { Box } from "native-base";
import { COLORS, ScreenWidth } from "../../../utils";
import ProfilePersonalInfo from "./ProfilePersonalInfo";
import ProfileDocuments from "./ProfileDocuments";
import { useTranslation } from "react-i18next";

const EditServiceProviderProfile = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const { t } = useTranslation();
  const [routes] = React.useState([
    {
      key: "first",
      title: t("Personal Info"),
      // data: ProfileInfo,
      navigation: navigation,
    },
    {
      key: "second",
      title: t("Documents"),
      // data: ProfileInfo,
      navigation: navigation,
    },
  ]);

  const renderScene = SceneMap({
    first: ProfilePersonalInfo,
    second: ProfileDocuments,
  });

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? COLORS.primary : COLORS.black;
          const borderColor = index === i ? COLORS.primary : COLORS.lightGrey;
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
              key={i}
              backgroundColor={"white"}
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                    fontWeight: index === i ? "bold" : 400,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  const onPressNotification = () => {

  };

  return (
    <>
      <CustomHeader
        title={t("edit") + " " + t("profile")}
        icon
        back
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={ScreenWidth}
      />
    </>
  );
};

export default EditServiceProviderProfile;

const styles = StyleSheet.create({});
