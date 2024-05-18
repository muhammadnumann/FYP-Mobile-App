import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserFaq from "../UserProfile/UserFaq";
import UserPrivacy from "../UserProfile/UserPrivacy";
import UserShareApp from "../UserProfile/UserShareApp";
import UserEditProfile from "../UserProfile/UserEditProfile";
import ProfileManageAddress from "../UserProfile/ProfileManageAddress";
import ProfileChangePassword from "../UserProfile/ProfileChangePassword";
import ProfileServiceProvider from "../UserProfile/ProfileServiceProvider";
import SelectCountry from "../../SharedScreens/Location/SelectCountry";
import SelectState from "../../SharedScreens/Location/SelectState";
import SelectCity from "../../SharedScreens/Location/SelectCity";
import SelectLanguage from "../UserProfile/SelectLanguage";
import Wallet from "../UserWallet/Wallet";
import AddFund from "../UserWallet/AddFunds/AddFund";
import EditAmount from "../UserWallet/AddFunds/EditAmount";
import AddFundSuccess from "../UserWallet/AddFunds/AddFundSuccess";
import AddBank from "../UserWallet/AddFunds/AddBank";
import AddBankAccount from "../UserWallet/AddFunds/AddBankAccount";
import UserNotification from "../UserNotifications/UserNotfications";
import CheckoutScreen from "../../CheckOutScreens/CheckOutScreen";
import UserProfileHome from "../UserProfile/UserProfileHome";

const UserStack = createStackNavigator();

export const UserProfileScreens = () => {
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
            <UserStack.Screen name="Language" component={SelectLanguage} />
            <UserStack.Screen name="country" component={SelectCountry} />
            <UserStack.Screen name="state" component={SelectState} />
            <UserStack.Screen name="city" component={SelectCity} />
            <UserStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </UserStack.Navigator>
    );
};