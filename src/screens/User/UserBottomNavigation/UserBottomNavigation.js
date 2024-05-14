import * as React from "react";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { CustomIcon } from "../../../components/CustomIcon";
import { COLORS } from "../../../utils";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BookingHomeScreens } from "./BookingHomeScreens";
import { UserProfileScreens } from "./UserProfileScreens";
import { UserHomeScreens } from "./UserHomeScreens";

const UserStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserBottomNavigation = ({ navigation }) => {
  const user = useSelector((state) => state.AuthReducer.user);
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.black,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
          // height: AppHeight(7),
        },
        tabBarLabelStyle: {
          fontSize: Platform.OS === "ios" ? null : 12,
          marginBottom: Platform.OS === "ios" ? null : 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={UserHomeScreens}
        options={{
          tabBarLabel: t("Home"),
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name={"HomeIcon"} color={color} />
          ),

          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                props.onPress();
                navigation.navigate("Home", { screen: "UserHome" });
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookingHomeScreens"
        component={BookingHomeScreens}
        options={{
          tabBarLabel: t("my_booking"),
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name={"BookingIcon"} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                props.onPress();
                navigation.navigate("BookingHomeScreens", {
                  screen: "UserBookingHome",
                  params: { index: 0 },
                });
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfileHome"
        component={UserProfileScreens}
        options={{
          tabBarLabel: t("Setting"),
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name={"SettingIcon"} color={color} />
          ),

          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                props.onPress();
                navigation.navigate("UserProfileHome", {
                  screen: "userProfile",
                });
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserBottomNavigation;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "#171717",
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
  },
});
