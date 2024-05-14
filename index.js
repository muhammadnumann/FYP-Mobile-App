/**
 * @format
 */
// import "@formatjs/intl-pluralrules/polyfill";
import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/ar";
import messaging from "@react-native-firebase/messaging";

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// // Initialize Firebase app
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Message handled in the background!", remoteMessage);
// });

// // Handle incoming push notifications
// messaging().onMessage(async (remoteMessage) => {
//   console.log("A new FCM message arrived!", remoteMessage);
// });

// // Handle incoming push notifications Kill mode
// messaging().getInitialNotification(async (remoteMessage) => {
//   console.log("Message handle in Kill state", remoteMessage);
// });
AppRegistry.registerComponent(appName, () => App);
