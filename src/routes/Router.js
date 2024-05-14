import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { handleRefreshToken, Init, Logout } from '../store/AuthActions';
import CustomLoading from '../components/Loading/CustomLoading';
import { postBearerRequest } from '../services/ApiServices';
import { REFRESH_TOKEN_URL } from '../services/ApiConstants';
import { AppHeight, AppWidth, COLORS } from '../utils';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18next from '../locales/I18n';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import {
  GetFCMToke,
  NotificationListner,
  requestUserPermission,
} from '../utils/pushnotification_helper';
import ForeGroundHandler from '../utils/NotificationHandler/ForeGroundHandler';
import {
  getCountryCode,
  getCurrentLocation,
  locationPermission,
  requestUserTrackingPermission,
} from '../utils/helperFunction';
import NetInfo from '@react-native-community/netinfo';
import { Button, Modal } from 'native-base';
import { CustomModal } from '../components/Modals/CustomModal';
import CustomSideDrawer from '../components/drawer/CustomSideDrawer';
import { navigationRef } from '../../RootNavigation';

// import jwt_decode from "jwt-decode";

const Stack = createStackNavigator();

const Router = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const token = useSelector((state) => state.AuthReducer.token);
  const loading = useSelector((state) => state.AuthReducer.loading);
  const [show, setShow] = React.useState(false);
  const isDrawerOpen = useSelector(
    (state) => state.NotificationReducer.isDrawerOpen
  );
  const { t } = useTranslation();

  // const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
  };

  useEffect(() => {
    // RefreshToken();
    // dispatch(Logout());
    if (Platform.OS === 'ios') requestUserTrackingPermission();
    requestUserPermission();
    NotificationListner();
    GetFCMToke();
    locationPermission();

    init();

    // setLoading(false);

    const interval = setInterval(() => {
      RefreshToken();
    }, 3600000); // call RefreshToken function every hour (3600000 milliseconds)
    return () => clearInterval(interval); // cleanup function to clear the interval when the component unmounts
  }, []);

  const RefreshToken = async () => {
    try {
      let response = await postBearerRequest(REFRESH_TOKEN_URL);
      dispatch(handleRefreshToken(response.data));
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setShow(true);
      }
    });
    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NativeBaseProvider>
      {show ? (
        <CustomModal visible={show} padding={true}>
          <Modal.Content maxWidth='350'>
            <View style={{ flexDirection: 'row' }}>
              {/* <Modal.CloseButton /> */}
              <Modal.Header style={{ width: 350, flexDirection: 'row' }}>
                Please try again later!
              </Modal.Header>
            </View>

            <Modal.Body>
              <Text>Network not Available</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  onPress={() => {
                    setShow(false);
                  }}
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {t('ok')}
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </CustomModal>
      ) : null}

      <I18nextProvider i18n={i18next}>
        {loading ? (
          <CustomLoading content={'Loading...'} />
        ) : (
          <NavigationContainer ref={navigationRef}>
            {/* <ForeGroundHandler /> */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user === null ? (
                <Stack.Screen name='Auth' component={AuthStack} />
              ) : (
                <Stack.Screen name='App' component={HomeStack} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
        {/* </ToastProvider> */}
      </I18nextProvider>

      {isDrawerOpen && <CustomSideDrawer />}
    </NativeBaseProvider>
  );
};

export default Router;
