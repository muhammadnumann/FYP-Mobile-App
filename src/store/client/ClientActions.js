import { USER_GET_DASHB_URL } from '../../services/ApiConstants';
import { getBearerRequest } from '../../services/ApiServices';
import {
  CompletedBookingService,
  InprogressBookingService,
  activeBookingService,
  cancelledBookingService,
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
      console.log(error);
      dispatch({
        type: 'LOAD_AUDIOS',
        payload: false,
      });
    }
  };
};

export const getActiveBookings = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_BOOKINGS',
      payload: true,
    });

    try {
      let response = await activeBookingService();
      dispatch({
        type: 'ACTIVE_BOOKINGS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_BOOKINGS',
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOAD_BOOKINGS',
        payload: false,
      });
    }
  };
};

export const getInprogressBookings = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_BOOKINGS',
      payload: true,
    });

    try {
      let response = await InprogressBookingService();
      dispatch({
        type: 'INPROGRESS_BOOKINGS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_BOOKINGS',
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOAD_BOOKINGS',
        payload: false,
      });
    }
  };
};

export const getCompleteBookings = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_BOOKINGS',
      payload: true,
    });

    try {
      let response = await CompletedBookingService();

      dispatch({
        type: 'COMPLETED_BOOKINGS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_BOOKINGS',
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOAD_BOOKINGS',
        payload: false,
      });
    }
  };
};

export const getCancelBookings = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_BOOKINGS',
      payload: true,
    });

    try {
      let response = await cancelledBookingService();

      dispatch({
        type: 'CANCELLED_BOOKINGS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_BOOKINGS',
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOAD_BOOKINGS',
        payload: false,
      });
    }
  };
};

export const getDashboardDetails = () => {
  return async (dispatch) => {
    try {
      let response = await getBearerRequest(USER_GET_DASHB_URL);
      dispatch({
        type: 'DASHBOARD_DETAILS',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
