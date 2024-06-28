export const getNotifications = () => {
  return async (dispatch, getState) => {
    // const { notifications } = getState().NotificationReducer;

    dispatch({
      type: 'LOAD_NOTIFICATIONS',
      payload: true,
    });

    try {
      let response = undefined
      dispatch({
        type: 'NOTIFICATIONS',
        payload: response.data,
      });
      dispatch({
        type: 'LOAD_NOTIFICATIONS',
        payload: false,
      });
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: 'LOAD_NOTIFICATIONS',
        payload: false,
      });
    }
  };
};

export const mergeNotifications = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'LOAD_NOTIFICATIONS',
      payload: true,
    });

    const { notifications } = getState().NotificationReducer;

    let mergedNotifications = [];

    if (Array.isArray(notifications)) {
      mergedNotifications = [data, ...notifications];
    } else {
      mergedNotifications = [data];
    }

    dispatch({
      type: 'MERGE_NOTIFICATIONS',
      payload: mergedNotifications,
    });

    dispatch({
      type: 'LOAD_NOTIFICATIONS',
      payload: false,
    });
  };
};

export const openDrawer = () => ({
  type: 'OPEN_DRAWER',
});

export const closeDrawer = () => ({
  type: 'CLOSE_DRAWER',
});
