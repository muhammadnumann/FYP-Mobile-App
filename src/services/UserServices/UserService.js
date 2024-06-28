import { useQuery } from 'react-query';
import {
  GET_FAKE_AUDIOS_URL,
  GET_REAL_AUDIOS_URL,
  UPLOAD_AUDIOS_URL,
} from '../ApiConstants';
import {
  getBearerRequest,
  postBearerRequest,
} from '../ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const realAudioService = async () => {
  const response = await getBearerRequest(GET_REAL_AUDIOS_URL);
  return response.services;
};
export const fakeAudioService = async () => {
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
