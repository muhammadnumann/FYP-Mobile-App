import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../ServiceProviderHome/Dashboard";
import Profile from "../ServicePrviderProfile/Profile";
import InboxHome from "../ServiceProviderInbox/InboxHome";
import Inbox from "../ServiceProviderInbox/Inbox";
import Wallet from "../Wallet/Wallet";
import { CustomIcon } from "../../../components/CustomIcon";
import { COLORS } from "../../../utils";
import MyJobScreen from "../ServiceProviderHome/MyJobs/MyJobScreen";
import NewJobScreen from "../ServiceProviderHome/NewJobs/NewJobScreen";
import InProgressScreen from "../ServiceProviderHome/InProgressJobs/InProgressScreen";
import CancelledJobScreen from "../ServiceProviderHome/CancelledJobs/CancelledJobScreen";
import JobDirection from "../ServiceProviderHome/MyJobs/JobDirection";
import EditServiceProviderProfile from "../ServicePrviderProfile/EditServiceProviderProfile";
import ServiceReceipt from "../ServiceProviderHome/InProgressJobs/ServiceReceipt";
import WithdrawFund from "../Wallet/Withdraw/WithdrawFund";
import EditAmount from "../Wallet/Withdraw/EditAmount";
import AddBank from "../Wallet/Withdraw/AddBank";
import AddBankAccount from "../Wallet/Withdraw/AddBankAccount";
import WithdrawSuccess from "../Wallet/Withdraw/WithdrawSuccess";
import ProfileJob from "../ServicePrviderProfile/ProfileJob";
import ProfileManageAvailability from "../ServicePrviderProfile/ProfileManageAvailability";
import ProfileChangePassword from "../ServicePrviderProfile/ProfileChangePassword";
import ProfileHelpCenter from "../ServicePrviderProfile/ProfileHelpCenter";
import ProfileInvoices from "../ServicePrviderProfile/ProfileInvoices";
import ProfileManageRates from "../ServicePrviderProfile/ProfileManageRates";
import ProfileServicesCategories from "../ServicePrviderProfile/ProfileServicesCategories";
import ProfileFaq from "../ServicePrviderProfile/ProfileFaq";
import ProfileShareApp from "../ServicePrviderProfile/ProfileShareApp";
import ProfilePrivacy from "../ServicePrviderProfile/ProfilePrivacy";
import SelectCountry from "../../SharedScreens/Location/SelectCountry";
import SelectState from "../../SharedScreens/Location/SelectState";
import SelectCity from "../../SharedScreens/Location/SelectCity";
import SelectLanguage from "../ServicePrviderProfile/SelectLanguage";
import { useTranslation } from "react-i18next";
import SpPaymentMethod from "../PaymentScreens/SpPaymentMethod";
import AddFund from "../Wallet/AddFunds/AddFund";
import AddFundAccount from "../Wallet/AddFunds/AddFundAccount";
import AddFundBank from "../Wallet/AddFunds/AddFundBank";
import AddFundSuccess from "../Wallet/AddFunds/AddFundSuccess";
import EditFundAmount from "../Wallet/AddFunds/EditFundAmount";
import SpNotifications from "../SpNotifications/SpNotfications";
import SpBookingDetail from "../SpBookings/SpBookingDetail";
import GenerateBill from "../PaymentScreens/GenerateBill";
import { TouchableOpacity } from "react-native";
import ProfileCompletedJob from "../ServicePrviderProfile/ProfileCompletedJob";
import BookingDetailsCommon from "../../BookingDetailsCommon";

const ServiceProvierStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ServiceProviderDashboard = () => {
  return (
    <ServiceProvierStack.Navigator screenOptions={{ headerShown: false }}>
      <ServiceProvierStack.Screen name="Dashboard" component={Dashboard} />
      <ServiceProvierStack.Screen name="MyJobScreen" component={MyJobScreen} />
      <ServiceProvierStack.Screen
        name="GenerateBill"
        component={GenerateBill}
      />

      <ServiceProvierStack.Screen
        name="BookingDetailsCommon"
        component={BookingDetailsCommon}
      />

      <ServiceProvierStack.Screen
        name="SpNotifications"
        component={SpNotifications}
      />
      <ServiceProvierStack.Screen
        name="SpBookingDetail"
        component={SpBookingDetail}
      />
      <ServiceProvierStack.Screen
        name="JobDirection"
        component={JobDirection}
      />
      <ServiceProvierStack.Screen
        name="NewJobScreen"
        component={NewJobScreen}
      />
      <ServiceProvierStack.Screen
        name="InProgressScreen"
        component={InProgressScreen}
      />
      <ServiceProvierStack.Screen
        name="CancelledJobScreen"
        component={CancelledJobScreen}
      />
      <ServiceProvierStack.Screen
        name="ServiceReceipts"
        component={ServiceReceipt}
      />
      <ServiceProvierStack.Screen
        name="ProfileCompletedJob"
        component={ProfileCompletedJob}
      />
      <ServiceProvierStack.Screen name="Inbox" component={Inbox} />
    </ServiceProvierStack.Navigator>
  );
};

const ServiceProviderProfile = () => {
  return (
    <ServiceProvierStack.Navigator screenOptions={{ headerShown: false }}>
      <ServiceProvierStack.Screen name="profile" component={Profile} />
      <ServiceProvierStack.Screen
        name="EditServiceProviderProfile"
        component={EditServiceProviderProfile}
      />
      <ServiceProvierStack.Screen name="ProfileJob" component={ProfileJob} />
      <ServiceProvierStack.Screen
        name="ProfileManageAvailability"
        component={ProfileManageAvailability}
      />
      <ServiceProvierStack.Screen
        name="ProfileChangePassword"
        component={ProfileChangePassword}
      />
      <ServiceProvierStack.Screen
        name="ProfileHelpCenter"
        component={ProfileHelpCenter}
      />
      <ServiceProvierStack.Screen
        name="ProfileInvoices"
        component={ProfileInvoices}
      />
      <ServiceProvierStack.Screen
        name="ProfileManageRates"
        component={ProfileManageRates}
      />
      <ServiceProvierStack.Screen
        name="ProfileServicesCategories"
        component={ProfileServicesCategories}
      />
      <ServiceProvierStack.Screen name="ProfileFaq" component={ProfileFaq} />
      <ServiceProvierStack.Screen
        name="ProfileShareApp"
        component={ProfileShareApp}
      />
      <ServiceProvierStack.Screen
        name="SpNotifications"
        component={SpNotifications}
      />
      <ServiceProvierStack.Screen
        name="ProfilePrivacy"
        component={ProfilePrivacy}
      />
      <ServiceProvierStack.Screen name="language" component={SelectLanguage} />
      <ServiceProvierStack.Screen name="country" component={SelectCountry} />
      <ServiceProvierStack.Screen name="state" component={SelectState} />
      <ServiceProvierStack.Screen name="city" component={SelectCity} />

      {/* wallet screens */}
      <ServiceProvierStack.Screen name="wallet" component={Wallet} />
      <ServiceProvierStack.Screen
        name="WithdrawFund"
        component={WithdrawFund}
      />
      <ServiceProvierStack.Screen name="EditAmount" component={EditAmount} />
      <ServiceProvierStack.Screen name="AddBank" component={AddBank} />
      <ServiceProvierStack.Screen
        name="SpPaymentMethod"
        component={SpPaymentMethod}
      />
      <ServiceProvierStack.Screen name="AddFund" component={AddFund} />
      <ServiceProvierStack.Screen
        name="AddFundAccount"
        component={AddFundAccount}
      />
      <ServiceProvierStack.Screen name="AddFundBank" component={AddFundBank} />
      <ServiceProvierStack.Screen
        name="AddFundSuccess"
        component={AddFundSuccess}
      />
      <ServiceProvierStack.Screen
        name="EditFundAmount"
        component={EditFundAmount}
      />
      <ServiceProvierStack.Screen
        name="AddBankAccount"
        component={AddBankAccount}
      />
      <ServiceProvierStack.Screen
        name="WithdrawSuccess"
        component={WithdrawSuccess}
      />
    </ServiceProvierStack.Navigator>
  );
};

const ServiceProviderInbox = () => {
  return (
    <ServiceProvierStack.Navigator screenOptions={{ headerShown: false }}>
      <ServiceProvierStack.Screen name="InboxHome" component={InboxHome} />
      <ServiceProvierStack.Screen name="Inbox" component={Inbox} />
    </ServiceProvierStack.Navigator>
  );
};

const ServiceProviderWallet = () => {
  return (
    <ServiceProvierStack.Navigator screenOptions={{ headerShown: false }}>
      <ServiceProvierStack.Screen name="wallet" component={Wallet} />
      <ServiceProvierStack.Screen
        name="WithdrawFund"
        component={WithdrawFund}
      />
      <ServiceProvierStack.Screen name="EditAmount" component={EditAmount} />
      <ServiceProvierStack.Screen name="AddBank" component={AddBank} />
      <ServiceProvierStack.Screen
        name="SpPaymentMethod"
        component={SpPaymentMethod}
      />
      <ServiceProvierStack.Screen name="AddFund" component={AddFund} />
      <ServiceProvierStack.Screen
        name="AddFundAccount"
        component={AddFundAccount}
      />
      <ServiceProvierStack.Screen name="AddFundBank" component={AddFundBank} />
      <ServiceProvierStack.Screen
        name="AddFundSuccess"
        component={AddFundSuccess}
      />
      <ServiceProvierStack.Screen
        name="EditFundAmount"
        component={EditFundAmount}
      />
      <ServiceProvierStack.Screen
        name="AddBankAccount"
        component={AddBankAccount}
      />
      <ServiceProvierStack.Screen
        name="WithdrawSuccess"
        component={WithdrawSuccess}
      />
      <ServiceProvierStack.Screen
        name="SpNotifications"
        component={SpNotifications}
      />
    </ServiceProvierStack.Navigator>
  );
};

const ServiceProviderNavigation = ({ navigation }) => {
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
        component={ServiceProviderDashboard}
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
                navigation.navigate("Home", { screen: "Dashboard" });
              }}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="ServiceProviderInbox"
        component={ServiceProviderInbox}
        options={{
          tabBarLabel: t("inbox"),
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name={"InboxIcon"} color={color} />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="ServiceProviderWallet"
        component={ServiceProviderWallet}
        options={{
          tabBarLabel: t("my_wallet"),
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name={"ServiceProviderWallet"} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="ServiceProviderProfile"
        component={ServiceProviderProfile}
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
                navigation.navigate("ServiceProviderProfile", {
                  screen: "profile",
                });
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ServiceProviderNavigation;
