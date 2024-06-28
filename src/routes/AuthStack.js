import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "../screens/AuthenticationScreens/Login";
import OtpScreen from "../screens/AuthenticationScreens/OtpScreen";
import Register from "../screens/AuthenticationScreens/Register";
import UploadDoc from "../screens/AuthenticationScreens/UploadDoc";
import ForgotPassword from "../screens/AuthenticationScreens/ForgotPassword/ForgotPassword";
import ResetPassword from "../screens/AuthenticationScreens/ForgotPassword/ResetPassword";
import ForgotPasswordOTP from "../screens/AuthenticationScreens/ForgotPassword/ForgotPasswordOTP";
import OtpVerification from "../screens/AuthenticationScreens/OtpVerification";
import { PermissionsAndroid } from "react-native";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

  useEffect(() => {
    // requestPermission();
    checkAppFirstLaunch();
  }, []);

  const checkAppFirstLaunch = async () => {
    const appData = await AsyncStorage.getItem("isAppFirstLaunch");
    setIsAppFirstLaunch(appData === null);
  };

  const markAppFirstLaunch = async () => {
    await AsyncStorage.setItem("isAppFirstLaunch", "true");
  };

  if (isAppFirstLaunch === null) {
    return null; // Show a loading screen while checking the first launch
  }

  // if (isAppFirstLaunch) {
  //   markAppFirstLaunch(); // Mark app as launched for future runs
  //   return (
  //     <Stack.Navigator screenOptions={{ headerShown: false }}>
  //       <Stack.Screen name="Login" component={Login} />
  //       <Stack.Screen name="Register" component={Register} />
  //       <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  //       <Stack.Screen name="OtpScreen" component={OtpScreen} />
  //       <Stack.Screen name="UploadDoc" component={UploadDoc} />
  //       <Stack.Screen name="ResetPassword" component={ResetPassword} />
  //       <Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP} />
  //       <Stack.Screen name="OtpVerification" component={OtpVerification} />
  //     </Stack.Navigator>
  //   );
  // }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />

      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="UploadDoc" component={UploadDoc} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
    </Stack.Navigator>
  );
};

export default AuthStack;
