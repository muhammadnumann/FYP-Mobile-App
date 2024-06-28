import { useQuery } from 'react-query';
import {
  BOOKING_FEEDBACK_URL,
  CANCEL_BOOKING_URL,
  GET_BOOKING_URL,
  GET_CANCELLED_BOOKING_URL,
  GET_CHAT_LIST_URL,
  GET_COMPLETED_BOOKING_URL,
  GET_FAKE_AUDIOS_URL,
  GET_INPROGRESS_BOOKING_URL,
  GET_NEW_BOOKING_URL,
  GET_REAL_AUDIOS_URL,
  GET_SERVICES_URL,
  GET_SERVICE_BOOKING_URL,
  GET_SERVICE_PROVIDERS_BY_ID_URL,
  GET_SP_AVAILABILITY_URL,
  UPLOAD_AUDIOS_URL,
} from '../ApiConstants';
import {
  getBearerRequest,
  getRequest,
  postBearerRequest,
} from '../ApiServices';
import { UPDATE_USER_ADDRESS_URL } from '../ApiConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const realAudioService = async () => {
  let user = await AsyncStorage.getItem("user");
  const response = await getBearerRequest(GET_REAL_AUDIOS_URL);
  return response.services;
};
export const fakeAudioService = async () => {
  let user = await AsyncStorage.getItem("user");
  const response = await getBearerRequest(GET_FAKE_AUDIOS_URL);
  return response.services;
};

export const uploadAudioService = async (file) => {
  let user = await AsyncStorage.getItem("user");
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', JSON.parse(user).id);
  const response = await postBearerRequest(UPLOAD_AUDIOS_URL, formData, { 'Content-Type': 'multipart/form-data', });
  return response.data;
};


export const getServices = (code) => {
  const { isLoading, data, isError, error } = useQuery(
    'get-services-for-user',
    () => {
      return getBearerRequest(GET_SERVICE_BOOKING_URL + '?countryCode=' + 'PK');
    }
  );

  console.log('error', error);
  return { isLoading, data, isError, error };
};

export const GetServiceProvidersById = async (serviceId) => {
  const response = await getBearerRequest(
    GET_SERVICE_PROVIDERS_BY_ID_URL + serviceId
  );
  return response.data;
};

export async function UpdateUserAddress(data) {
  const response = await postBearerRequest(UPDATE_USER_ADDRESS_URL, data);
  return response;
}



export const activeBookingService = async () => {
  const response = await getBearerRequest(GET_NEW_BOOKING_URL);
  return response.data;
};

export const InprogressBookingService = async () => {
  const response = await getBearerRequest(GET_INPROGRESS_BOOKING_URL);
  return response.data;
};

export const CompletedBookingService = async () => {
  const response = await getBearerRequest(GET_COMPLETED_BOOKING_URL);
  return response.data;
};

export const cancelledBookingService = async () => {
  const response = await getBearerRequest(GET_CANCELLED_BOOKING_URL);
  return response.data;
};

export const BookingFeedbackService = async (data) => {
  const response = await postBearerRequest(BOOKING_FEEDBACK_URL, data);
  return response.data;
};

export const getSpAvailabilityService = async (id) => {
  const response = await getBearerRequest(
    GET_SP_AVAILABILITY_URL + '?id=' + id
  );
  return response.data;
};
