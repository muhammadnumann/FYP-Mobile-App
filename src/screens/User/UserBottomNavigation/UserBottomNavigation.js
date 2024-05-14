import * as React from "react";
import { StyleSheet, Platform, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { CustomIcon } from "../../../components/CustomIcon";
import { COLORS } from "../../../utils";
import UserHome from "../UserHome/UserHome";
import UserInboxHome from "../UserInbox/UserInboxHome";
import UserBookingHome from "../UserBookings/UserBookingHome";
import UserProfileHome from "../UserProfile/UserProfileHome";
import AgentsScreen from "../Agents/AgentsScreen";
import AgentProfileScreen from "../Agents/AgentProfileScreen";
import AddAddress from "../UserHome/AddAddress";
import Address from "../UserHome/Address";
import BookingConfirmation from "../Agents/BookingConfirmation";
import UserFaq from "../UserProfile/UserFaq";
import UserPrivacy from "../UserProfile/UserPrivacy";
import UserShareApp from "../UserProfile/UserShareApp";
import UserInbox from "../UserInbox/UserInbox";
import UserEditProfile from "../UserProfile/UserEditProfile";
import SelectBooking from "../Agents/SelectBooking";
import ProfileManageAddress from "../UserProfile/ProfileManageAddress";
import ProfileChangePassword from "../UserProfile/ProfileChangePassword";
import ProfileHelp from "../UserProfile/ProfileHelp";
import ProfileServiceProvider from "../UserProfile/ProfileServiceProvider";
import SelectCountry from "../../SharedScreens/Location/SelectCountry";
import SelectState from "../../SharedScreens/Location/SelectState";
import SelectCity from "../../SharedScreens/Location/SelectCity";
import { useSelector } from "react-redux";
import AgentAvailability from "../Agents/AgentAvailability";
import ClientPaymentReceipt from "../PaymentScreens/ClientPaymentReceipt";
import ClientPaymentMethod from "../PaymentScreens/ClientPaymentMethod";
import SelectLanguage from "../UserProfile/SelectLanguage";
import { useTranslation } from "react-i18next";
import AvailableServices from "../UserHome/Services/AvailableServices";
import AddBookingAddress from "../UserHome/Services/AddBookingAddress";
import ScheduleBooking from "../UserHome/Services/ScheduleBooking";
import AvailableServiceProviders from "../UserBookings/AvailableServiceProviders";
import Wallet from "../UserWallet/Wallet";
import AddFund from "../UserWallet/AddFunds/AddFund";
import EditAmount from "../UserWallet/AddFunds/EditAmount";
import AddFundSuccess from "../UserWallet/AddFunds/AddFundSuccess";
import AddBank from "../UserWallet/AddFunds/AddBank";
import AddBankAccount from "../UserWallet/AddFunds/AddBankAccount";
import ClientBookingRecepient from "../PaymentScreens/ClientBookingRecepient";
import UserNotification from "../UserNotifications/UserNotfications";
import AllServices from "../UserHome/AllServices";
import PromotionsHome from "../UserPromotions/PromotionsHome";
import CheckoutScreen from "../../CheckOutScreens/CheckOutScreen";
import BookingDetailsCommon from "../../BookingDetailsCommon";

const UserStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserHomeScreens = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="UserHome" component={UserHome} />
      <UserStack.Screen name="UserNotification" component={UserNotification} />
      <UserStack.Screen name="Address" component={Address} />
      <UserStack.Screen name="AgentsScreen" component={AgentsScreen} />
      <UserStack.Screen name="SelectBooking" component={SelectBooking} />
      <UserStack.Screen
        name="ClientBookingRecepient"
        component={ClientBookingRecepient}
      />

      <UserStack.Screen
        name="BookingDetailsCommon"
        component={BookingDetailsCommon}
      />
      <UserStack.Screen
        name="AvailableServices"
        component={AvailableServices}
      />
      <UserStack.Screen
        name="AddBookingAddress"
        component={AddBookingAddress}
      />
      <UserStack.Screen name="ScheduleBooking" component={ScheduleBooking} />

      <UserStack.Screen
        name="ClientPaymentMethod"
        component={ClientPaymentMethod}
      />
      <UserStack.Screen
        name="AgentAvailability"
        component={AgentAvailability}
      />
      <UserStack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
      />
      <UserStack.Screen name="UserInbox" component={UserInbox} />

      <UserStack.Screen name="AllServices" component={AllServices} />
    </UserStack.Navigator>
  );
};

const AddAddressScreen = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="Address" component={Address} />
      <UserStack.Screen name="AddAddress" component={AddAddress} />
      <UserStack.Screen name="country" component={SelectCountry} />
      <UserStack.Screen name="state" component={SelectState} />
      <UserStack.Screen
        name="ClientBookingRecepient"
        component={ClientBookingRecepient}
      />
      <UserStack.Screen name="city" component={SelectCity} />
      <UserStack.Screen name="UserNotification" component={UserNotification} />
    </UserStack.Navigator>
  );
};

const UserProfileScreens = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="userProfile" component={UserProfileHome} />
      <UserStack.Screen name="UserFaq" component={UserFaq} />
      <UserStack.Screen name="UserPrivacy" component={UserPrivacy} />
      <UserStack.Screen name="UserShareApp" component={UserShareApp} />
      <UserStack.Screen name="UserEditProfile" component={UserEditProfile} />
      <UserStack.Screen name="UserNotification" component={UserNotification} />

      <UserStack.Screen
        name="ProfileserviceProvider"
        component={ProfileServiceProvider}
      />
      <UserStack.Screen
        name="ProfileManageAddress"
        component={ProfileManageAddress}
      />
      <UserStack.Screen
        name="ProfileChangePassword"
        component={ProfileChangePassword}
      />
      <UserStack.Screen name="Wallet" component={Wallet} />
      <UserStack.Screen name="AddFund" component={AddFund} />
      <UserStack.Screen name="EditAmount" component={EditAmount} />
      <UserStack.Screen name="AddFundSuccess" component={AddFundSuccess} />
      <UserStack.Screen name="AddBank" component={AddBank} />
      <UserStack.Screen name="AddBankAccount" component={AddBankAccount} />
      <UserStack.Screen name="ProfileHelp" component={ProfileHelp} />
      <UserStack.Screen name="Language" component={SelectLanguage} />
      <UserStack.Screen name="country" component={SelectCountry} />
      <UserStack.Screen name="state" component={SelectState} />
      <UserStack.Screen name="city" component={SelectCity} />
      <UserStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </UserStack.Navigator>
  );
};
const UserPromotions = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <UserStack.Screen name="UserInboxList" component={UserInboxHome} />
      <UserStack.Screen name="UserInbox" component={UserInbox} />
      <UserStack.Screen
        name="ClientBookingRecepient"
        component={ClientBookingRecepient}
      /> */}
      <UserStack.Screen name="UserNotification" component={UserNotification} />
      {/* <UserStack.Screen name="UserPromotions" component={PromotionsHome} /> */}
    </UserStack.Navigator>
  );
};

const BookingHomeScreens = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="UserBookingHome" component={UserBookingHome} />
      <UserStack.Screen
        name="AvailableServiceProviders"
        component={AvailableServiceProviders}
      />
      <UserStack.Screen name="UserNotification" component={UserNotification} />

      <UserStack.Screen
        name="ClientPaymentReceipt"
        component={ClientPaymentReceipt}
      />
      <UserStack.Screen
        name="ClientBookingRecepient"
        component={ClientBookingRecepient}
      />
      <UserStack.Screen
        name="ClientPaymentMethod"
        component={ClientPaymentMethod}
      />
      <UserStack.Screen
        name="AgentProfileScreen"
        component={AgentProfileScreen}
      />
      <UserStack.Screen name="UserInboxList" component={UserInboxHome} />
      <UserStack.Screen name="UserInbox" component={UserInbox} />
    </UserStack.Navigator>
  );
};

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
        component={
          user?.countryName === null ? AddAddressScreen : UserHomeScreens
        }
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
      {/* <Tab.Screen
        name="PromotionsHome"
        component={UserPromotions}
        options={{
          tabBarLabel: t("Promotions"),
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name={"favouriteIcon"} color={color} />
          ),
          // tabBarBadge: 3,

          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                props.onPress();
                navigation.navigate("PromotionsHome", {
                  screen: "UserPromotions",
                });
              }}
            />
          ),
        }}
      /> */}
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
