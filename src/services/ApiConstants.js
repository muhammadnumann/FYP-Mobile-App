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

export const GET_SERVICES_URL = `${API_URL}/Dropdowns/get-services-list`;
export const UPLOAD_FILE_URL = `${API_URL}/File/UploadFiles`;
export const GET_ACCOUNT_URL = `${API_URL}/Accounts/get-profile-info`;
export const REFRESH_TOKEN_URL = `${API_URL}/Accounts/refresh-token`;
export const VERIFY_PHONE_URL = `${API_URL}/Accounts/verify-phone-code`;
export const VERIFY_PHONE_RG_URL = `${API_URL}/Accounts/verify-phone-number`;
export const UPDATE_PROFILE_URL = `${API_URL}/Accounts/update-profile`;
export const DELETE_PROFILE_URL = `${API_URL}/Accounts`;
export const UPLOAD_IMAGE_URL = `${API_URL}/File/upload-file`;
export const GET_COUNTRIES_URL = `${API_URL}/Location/get-countries`;
export const GET_STATES_URL = `${API_URL}/Location/get-country-states`;
export const GET_CITIES_URL = `${API_URL}/Location/get-state-cities`;
export const UPDATE_PROFILE_DOC_URL = `${API_URL}/Users/update-profile-document`;
export const GET_PROFILE_DOC_URL = `${API_URL}/Users/get-profile-document`;
export const GET_AVAILABILITY_URL = `${API_URL}/Users/get-availbilities`;
export const UPDATE_AVAILABILITY_URL = `${API_URL}/Users/update-availbilities`;
export const GET_SP_AVAILABILITY_URL = `${API_URL}/Users/get-sp-availbilities`;
export const SERVICE_URL = `${API_URL}/Dropdowns/get-services-list`;
export const USER_AUTHENTICATE_API_URL = `${API_URL}/Accounts/AuthenticateUser`;
export const USER_AUTHENTICATE_OTP_API_URL = `${API_URL}/Accounts/VerifyAuthenticatePin`;
export const GET_CLIENT_INFO_BY_ID = `${API_URL}/Users/get-booking-client-info`;
export const SET_LANG = `${API_URL}/Accounts/set-lang`;
export const GET_VISIT_CHARGES_URL = `${API_URL}/Settings/get-visit-charges`;
export const GET_AVAILABLE_COUNTRY_URL = `${API_URL}/Dropdowns/get-active-countries`;
export const GET_INVOICE_BOOKING_URL = `${API_URL}/Bookings/get-invoiced-booking`;
export const GET_BKING_ASSIGN_TIME = `${API_URL}/Settings/get-booking-assign-timer`;
export const GET_BKING_DATE = `${API_URL}/Settings/get-booking-warrenty-days`;
export const REOPEN_BOOKING_URL = `${API_URL}/Bookings/set-reopen`;
export const LOGOUT_URL = `${API_URL}/Accounts/logout`;
export const GET_CONTACT = `${API_URL}/Settings/get-contact-number`;

//Get Images URL
export const UPLOADED_IMAGES = "/Uploads/";

//API End Points for User Account
export const GET_SERVICE_PROVIDERS_BY_ID_URL = `${API_URL}/Users/get-service-providers-by-service?serviceId=`;
export const UPDATE_USER_ADDRESS_URL = `${API_URL}/Users/update-user-address`;

//API End Points for User Dashboard
export const USER_GET_DASHB_SP_URL = `${API_URL}/Dashboard/get-detail-sp`;

export const USER_PROMOTIONS_URL = `${API_URL}/Promotions/get-promotions`;

//API End Points for Bookings
export const CANCEL_BOOKING_URL = `${API_URL}/Bookings/set-cancelled`;
export const REJECTED_BOOKING_URL = `${API_URL}/Bookings/set-rejected`;
export const INPROGRESS_BOOKING_URL = `${API_URL}/Bookings/set-inprogress`;
export const SAVE_BOOKING_URL = `${API_URL}/Bookings/save-booking`;
export const GET_BOOKING_URL = `${API_URL}/Bookings/get-bookings`;
export const GET_NEW_BOOKING_URL = `${API_URL}/Bookings/get-new-bookings`;
export const GET_REJECTED_BOOKING_URL = `${API_URL}/Bookings/get-rejected-bookings`;
export const GET_INPROGRESS_BOOKING_URL = `${API_URL}/Bookings/get-inprogress-bookings`;
export const GET_CANCELLED_BOOKING_URL = `${API_URL}/Bookings/get-cancelled-bookings`;
export const GET_COMPLETED_BOOKING_URL = `${API_URL}/Bookings/get-completed-bookings`;
export const SET_COMPLETED_BOOKING_URL = `${API_URL}/Bookings/set-completed`;
export const END_BOOKING_URL = `${API_URL}/Bookings/end-booking`;
export const GENERATE_BOOKING_INVO_URL = `${API_URL}/Bookings/generate-booking-invoice`;
export const GET_SERVICE_BOOKING_URL = `${API_URL}/dropdowns/get-services-for-booking`;
export const GET_BOOKING_BY_ID_URL = `${API_URL}/Bookings/get-booking-by-id`;
export const GET_ACCEPT_BOOKING_BY_SP_URL = `${API_URL}/Bookings/accept-booking`;
export const GET_SP_AVAILABLE_BOOKING_URL = `${API_URL}/Bookings/get-booking-sps`;
export const GET_AVAILABLE_SERVICES = `${API_URL}/Dropdowns/get-services`;

export const ASSIGN_SP_BOOKING_URL = `${API_URL}/Bookings/assign-booking-sp`;
export const GET_BOOKING_SP_INFO_URL = `${API_URL}/users/get-booking-sp-info`;
export const ADD_BOOKING_REVIEW_URL = `${API_URL}/Bookings/add-booking-review`;

//API End Points for Chat
export const GET_CHAT_LIST_URL = `${API_URL}/Chat/get-chat-list`;
export const SEND_CHAT_URL = `${API_URL}/Chat/send-message`;
export const GET_CHAT_URL = `${API_URL}/Chat/get-chat`;
export const GET_CHAT_BY_ID_URL = `${API_URL}/Chat/get-chat-by-userid`;
export const DELETE_CHAT_URL = `${API_URL}/Chat/delete-chat`;
export const DELETE_MESSAGE_URL = `${API_URL}/Chat/delete-message`;

//API End Points for Admin Chat
export const GET_ADMIN_CHAT_LIST_URL = `${API_URL}/Chat/get-help-chat-list`;
export const SEND_ADMIN_CHAT_URL = `${API_URL}/Chat/send-help-message`;
export const GET_ADMIN_CHAT_URL = `${API_URL}/Chat/get-help-chat`;
export const GET_ADMIN_CHAT_BY_ID_URL = `${API_URL}/Chat/get-help-chat-by-userid`;
export const DELETE_ADMIN_CHAT_URL = `${API_URL}/Chat/delete-help-chat`;
export const DELETE_ADMIN_MESSAGE_URL = `${API_URL}/Chat/delete-help-message`;

//API End Points for Notifications

export const MARK_AS_READ_NOTIFICATION_URL = `${API_URL}/Notifications/mark-as-read`;
export const MARK_AS_DELETE_NOTIFICATION_URL = `${API_URL}/Notifications/mark-as-delete`;
