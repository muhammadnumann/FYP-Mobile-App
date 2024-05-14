import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../../components/CustomHeader";
import { AppHeight, AppWidth, COLORS } from "../../../utils";
import { SceneMap, TabView } from "react-native-tab-view";
import ProfileCompletedJob from "./ProfileCompletedJob";
import ProfileRejectedJob from "./ProfileRejectedJob";
import { Box } from "native-base";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

const ProfileJob = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: "first",
      title: "Completed Jobs",
      // data: ProfileInfo,
      navigation: navigation,
    },
    {
      key: "second",
      title: "Rejected Jobs",
      // data: ProfileInfo,
      navigation: navigation,
    },
  ]);

  const renderScene = SceneMap({
    first: ProfileCompletedJob,
    second: ProfileRejectedJob,
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
  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader title="Jobs" back navigation={navigation} />
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={AppWidth(100)}
      />
    </View>
  );
};

export default ProfileJob;

const styles = StyleSheet.create({});
