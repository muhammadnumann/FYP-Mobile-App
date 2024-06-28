import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserHome from "../UserHome/UserHome";
import AllServices from "../UserHome/AllServices";


const UserStack = createStackNavigator();

export const UserHomeScreens = () => {
    return (
        <UserStack.Navigator screenOptions={{ headerShown: false }}>
            <UserStack.Screen name="UserHome" component={UserHome} />
            <UserStack.Screen name="AllServices" component={AllServices} />
        </UserStack.Navigator>
    );
};



