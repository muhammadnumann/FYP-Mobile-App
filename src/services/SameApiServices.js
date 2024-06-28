import {
  RESET_PASSWORD_URL,
  UPDATE_PROFILE_URL,
  UPLOAD_IMAGE_URL,
} from './ApiConstants';
import {
  getBearerRequest,
  postBearerRequest,
  postFormDataRequest,
} from './ApiServices';

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

export const logoutCall = async () => {
};

export const onLogout = async () => {
  try {
  } catch (error) {
    console.log('error', error);
  }
};

