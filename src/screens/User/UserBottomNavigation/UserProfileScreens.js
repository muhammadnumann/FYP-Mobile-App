import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserFaq from "../UserProfile/UserFaq";
import UserPrivacy from "../UserProfile/UserPrivacy";
import UserShareApp from "../UserProfile/UserShareApp";
import UserEditProfile from "../UserProfile/UserEditProfile";
import ProfileManageAddress from "../UserProfile/ProfileManageAddress";
import ProfileServiceProvider from "../UserProfile/ProfileServiceProvider";
import UserNotification from "../UserNotifications/UserNotfications";
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

        </UserStack.Navigator>
    );
};