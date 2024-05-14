import {
  CANCEL_BOOKING_URL,
  GET_ACCEPT_BOOKING_BY_SP_URL,
  GET_AVAILABILITY_URL,
  GET_CANCELLED_BOOKING_URL,
  GET_COMPLETED_BOOKING_URL,
  GET_INPROGRESS_BOOKING_URL,
  GET_NEW_BOOKING_URL,
  GET_PROFILE_DOC_URL,
  GET_REJECTED_BOOKING_URL,
  INPROGRESS_BOOKING_URL,
  REJECTED_BOOKING_URL,
  UPDATE_AVAILABILITY_URL,
  UPDATE_PROFILE_DOC_URL,
} from '../ApiConstants';
import { getBearerRequest, postBearerRequest } from '../ApiServices';

export const inProgressService = async () => {
  const response = await getBearerRequest(GET_INPROGRESS_BOOKING_URL);
  return response.data;
};

export const newJobService = async () => {
  const response = await getBearerRequest(GET_NEW_BOOKING_URL);
  return response.data;
};

export const CancelledService = async () => {
  const response = await getBearerRequest(GET_REJECTED_BOOKING_URL);
  return response.data;
};

export const completeJobServices = async () => {
  const response = await getBearerRequest(GET_COMPLETED_BOOKING_URL);
  return response.data;
};

export const getProfileDocService = async () => {
  const response = await getBearerRequest(GET_PROFILE_DOC_URL);
  return response.data;
};

export const updateProfileDocService = async (data) => {
  const response = await postBearerRequest(UPDATE_PROFILE_DOC_URL, data);
  return response.data;
};

export const setInprogress = async (id) => {
  const response = await getBearerRequest(
    INPROGRESS_BOOKING_URL + '?booking=' + id
  );
  return response.data;
};

export const setSpAcceptBooking = async (id, spid) => {
  const response = await getBearerRequest(
    GET_ACCEPT_BOOKING_BY_SP_URL + '?bookingid=' + id
  );
  return response.data;
};

export const rejectJob = async (id) => {
  const response = await getBearerRequest(
    REJECTED_BOOKING_URL + '?booking=' + id
  );
  return response.data;
};

export const getAvailabilityService = async () => {
  const response = await getBearerRequest(GET_AVAILABILITY_URL);
  return response.data;
};

export const updateAvailabilityService = async (data) => {
  const response = await postBearerRequest(UPDATE_AVAILABILITY_URL, data);
  return response.data;
};
