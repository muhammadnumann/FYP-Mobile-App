import {
  CancelledService,
  completeJobServices,
  inProgressService,
  newJobService,
} from '../../services/ServiceProviderServices/ServiceProviderService';

export const getNewJobs = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_JOBS',
      payload: true,
    });

    try {
      let response = await newJobService();
      dispatch({
        type: 'NEW_JOBS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_JOBS',
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOAD_JOBS',
        payload: false,
      });
    }
  };
};

export const getCompletedJobs = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_JOBS',
      payload: true,
    });

    try {
      let response = await completeJobServices();
      dispatch({
        type: 'COMPLETED_JOBS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_JOBS',
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOAD_JOBS',
        payload: false,
      });
    }
  };
};

export const getInProgressJobs = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_JOBS',
      payload: true,
    });

    try {
      let response = await inProgressService();
      dispatch({
        type: 'IN_PROGRESS_JOBS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_JOBS',
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOAD_JOBS',
        payload: false,
      });
    }
  };
};

export const getCancelJobs = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_JOBS',
      payload: true,
    });

    try {
      let response = await CancelledService();
      dispatch({
        type: 'CANCELLED_JOBS',
        payload: response,
      });
      dispatch({
        type: 'LOAD_JOBS',
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOAD_JOBS',
        payload: false,
      });
    }
  };
};
