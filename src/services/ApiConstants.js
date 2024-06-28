//API URL
//  export const API_URL = "https://api.mumtazservices.com";
export const API_URL = "http://10.0.2.2:3500";

//API End Points
export const REGISTER_URL = `${API_URL}/auth/sign-up`;
export const LOGIN_URL = `${API_URL}/auth/sign-in`;
export const SEND_CODE_URL = `${API_URL}/otp/sendOTP`;
export const VERIFY_EMAIL_URL = `${API_URL}/otp/verifyOTP`;
export const RESET_PASSWORD_URL = `${API_URL}/auth/forget-password`;
export const GET_REAL_AUDIOS_URL = `${API_URL}/service?isReal=true`;
export const GET_FAKE_AUDIOS_URL = `${API_URL}/service?isReal=false`;
export const UPLOAD_AUDIOS_URL = `${API_URL}/service/add`;
export const USER_GET_DASHB_URL = `${API_URL}/dashboard/get-detail`;
export const DELETE_PROFILE_URL = `${API_URL}/admin/delete-account`;
//Get Images URL
export const UPLOADED_IMAGES = "/Uploads/";

export const UPLOAD_IMAGE_URL = `${API_URL}/File/upload-file`;

export const UPDATE_PROFILE_URL = `${API_URL}/Accounts/update-profile`;