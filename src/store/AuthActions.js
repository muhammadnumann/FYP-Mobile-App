import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetFCMToke } from '../utils/pushnotification_helper';
import { getCountryCode } from '../utils/helperFunction';
import { logoutCall, onLogout } from '../services/SameApiServices';
import { deleteRequest } from '../services/ApiServices';
import { DELETE_PROFILE_URL } from '../services/ApiConstants';

export const Init = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('token');
    let data = await AsyncStorage.getItem('user');

    if (token !== null) {
      dispatch({
        type: 'TOKEN',
        payload: token,
      });
    }

    if (data !== null) {
      dispatch({
        type: 'LOGIN',
        payload: JSON.parse(data),
      });
    }

    dispatch({
      type: 'LOADING',
      payload: false,
    });
  };
};

export const handleLogin = (data) => {
  return async (dispatch) => {
    await AsyncStorage.setItem('token', data.userAuthToken);
    await AsyncStorage.setItem('user', JSON.stringify(data.accountData));
    dispatch({
      type: 'TOKEN',
      payload: data.userAuthToken,
    });

    dispatch({
      type: 'LOGIN',
      payload: data.user,
    });
  };
};

export const handleRegister = (data) => {
  return async (dispatch) => {
    await AsyncStorage.setItem('token', data.jwtToken);
    await AsyncStorage.setItem('user', JSON.stringify(data));
    dispatch({
      type: 'TOKEN',
      payload: data.jwtToken,
    });

    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  };
};

export const handleRefresh = (data) => {
  return async (dispatch) => {
    // await AsyncStorage.setItem("token", data.jwtToken);
    await AsyncStorage.setItem('user', JSON.stringify(data));

    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  };
};

export const handleRefreshToken = (data) => {
  return async (dispatch) => {
    await AsyncStorage.setItem('token', data.jwtToken);
    await AsyncStorage.setItem('user', JSON.stringify(data));
    dispatch({
      type: 'TOKEN',
      payload: data.jwtToken,
    });

    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  };
};

export const Logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    onLogout();

    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    GetFCMToke();
  };
};

export const DeleteAccount = (id) => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    await deleteRequest(`${DELETE_PROFILE_URL}/${id}`);
    onLogout();

    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    GetFCMToke();
  };
};
