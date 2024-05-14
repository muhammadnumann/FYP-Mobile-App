import {
  CANCEL_BOOKING_URL,
  GET_ACCOUNT_URL,
  GET_BOOKING_URL,
  GET_CHAT_BY_ID_URL,
  GET_CHAT_LIST_URL,
  GET_CHAT_URL,
  GET_CITIES_URL,
  GET_COUNTRIES_URL,
  GET_STATES_URL,
  LOGOUT_URL,
  RESET_PASSWORD_URL,
  SEND_ADMIN_CHAT_URL,
  SEND_CHAT_URL,
  SET_COMPLETED_BOOKING_URL,
  UPDATE_PROFILE_URL,
  UPLOAD_IMAGE_URL,
} from './ApiConstants';
import {
  getBearerRequest,
  getRequest,
  postBearerRequest,
  postFormDataRequest,
} from './ApiServices';
import { useQuery } from 'react-query';

export async function UploadImagetoServer(data) {
  const response = await postFormDataRequest(UPLOAD_IMAGE_URL, data);
  return response;
}

export async function EditProfile(data) {
  const response = await postBearerRequest(UPDATE_PROFILE_URL, data);
  return response;
}

export async function ChangePassword(data) {
  const response = await postBearerRequest(RESET_PASSWORD_URL, data);
  return response;
}

export const GetUserProfileInfo = () => {
  const { isLoading, data, isError, error } = useQuery(
    'get-profile-for-user',
    () => {
      return getBearerRequest(GET_ACCOUNT_URL);
    }
  );
  return { isLoading, data, isError, error };
};

export const getBookings = async () => {
  const response = await getBearerRequest(GET_BOOKING_URL);
  return response.data;
};

export const logoutCall = async () => {
  const response = await getBearerRequest(LOGOUT_URL);
  return response.data;
};

export const onLogout = async () => {
  try {
    let response = await logoutCall();
  } catch (error) {
    console.log('error', error);
  }
};

export const getCountries = () => {
  const { isLoading, data, isError, error } = useQuery('get-countries', () => {
    return getRequest(GET_COUNTRIES_URL);
  });
  return { isLoading, data, isError, error };
};

export const getStates = async (countryId) => {
  const response = await getRequest(GET_STATES_URL + '?countryId=' + countryId);
  return response.data;
};

export const getCities = async (stateId) => {
  const response = await getRequest(GET_CITIES_URL + '?stateId=' + stateId);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await getBearerRequest(
    CANCEL_BOOKING_URL + '?booking=' + id
  );
  return response.data;
};

export const FinishBookingService = async (id) => {
  const response = await getBearerRequest(
    SET_COMPLETED_BOOKING_URL + '?booking=' + id
  );
  return response.data;
};

export const getChatList = async (userId) => {
  const response = await getBearerRequest(
    GET_CHAT_LIST_URL + '?userId=' + userId
  );
  return response.data;
};

export const getChat = async (chatId) => {
  const response = await getBearerRequest(GET_CHAT_URL + '?chatId=' + chatId);
  return response.data;
};

export const getChatByUserId = async (chatId) => {
  const response = await getBearerRequest(
    GET_CHAT_BY_ID_URL + '?userid=' + chatId
  );
  return response.data;
};

export async function sendChat(data) {
  const response = await postBearerRequest(SEND_CHAT_URL, data);
  return response;
}

export async function sendAdminChat(data) {
  const response = await postBearerRequest(SEND_ADMIN_CHAT_URL, data);
  return response;
}
