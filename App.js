import "react-native-gesture-handler";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";
import Router from "./src/routes/Router";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/store";
import { QueryClientProvider, QueryClient } from "react-query";
import ForeGroundHandler from "./src/utils/NotificationHandler/ForeGroundHandler";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import CustomSideDrawer from "./src/components/drawer/CustomSideDrawer";

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  const queryClient = new QueryClient();

  React.useEffect(() => {
    // checkLaunch();
    SplashScreen.hide();
    // AsyncStorage.removeItem("isAppFirstLaunched");
  }, []);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#4BB543" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
