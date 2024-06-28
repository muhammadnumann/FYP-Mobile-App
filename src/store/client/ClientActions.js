import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_GET_DASHB_URL } from '../../services/ApiConstants';
import { getBearerRequest } from '../../services/ApiServices';
import {
  fakeAudioService,
  realAudioService,
} from '../../services/UserServices/UserService';

export const getRealAudios = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_AUDIOS',
      payload: true,
    });

    try {
      let response = await realAudioService();
      dispatch({
        type: 'REAL_AUDIOS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_AUDIOS',
        payload: false,
      });
    } catch (error) {

      dispatch({
        type: 'LOAD_AUDIOS',
        payload: false,
      });
    }
  };
};
export const getFakeAudios = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_AUDIOS',
      payload: true,
    });

    try {
      let response = await fakeAudioService();
      dispatch({
        type: 'FAKE_AUDIOS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_AUDIOS',
        payload: false,
      });
    } catch (error) {

      dispatch({
        type: 'LOAD_AUDIOS',
        payload: false,
      });
    }
  };
};

export const getDashboardDetails = () => {
  return async (dispatch) => {
    try {
      let response = await getBearerRequest(USER_GET_DASHB_URL)
      dispatch({
        type: 'DASHBOARD_DETAILS',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

