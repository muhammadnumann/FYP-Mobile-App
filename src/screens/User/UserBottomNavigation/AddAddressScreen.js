import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AddAddress from "../UserHome/AddAddress";
import Address from "../UserHome/Address";
import ClientBookingRecepient from "../PaymentScreens/ClientBookingRecepient";
import UserNotification from "../UserNotifications/UserNotfications";

const UserStack = createStackNavigator();

export const AddAddressScreen = () => {
    return (
        <UserStack.Navigator screenOptions={{ headerShown: false }}>
            <UserStack.Screen name="Address" component={Address} />
            <UserStack.Screen name="AddAddress" component={AddAddress} />
            <UserStack.Screen
                name="ClientBookingRecepient"
                component={ClientBookingRecepient}
            />
            <UserStack.Screen name="UserNotification" component={UserNotification} />
        </UserStack.Navigator>
    );
};

