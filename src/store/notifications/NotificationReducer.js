const initialState = {
  notifications: [],
  loadNotification: false,
  feedBackVisible: false,
  feedBackData: null,
  clientFeedbackData: null,
  currentLocationCords: null,

  isDrawerOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFICATIONS":
      return {
        ...state, //copy all previous states
        notifications: action.payload,
      };
    case "LOAD_NOTIFICATIONS":
      return {
        ...state, //copy all previous states
        loadNotification: action.payload,
      };
    case "FEEDBACK_VISIBLE":
      return {
        ...state, //copy all previous states
        feedBackVisible: action.payload,
      };
    case "MERGE_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };
    case "FEEDBACK_DATA":
      return {
        ...state, //copy all previous states
        feedBackData: action.payload,
      };
    case "CLIENT_FEEDBACK_DATA":
      return {
        ...state, //copy all previous states
        clientFeedbackData: action.payload,
      };

    case "CURRENT_LOCATION_CORDS":
      return {
        ...state, //copy all previous states
        currentLocationCords: action.payload,
      };

    case "OPEN_DRAWER":
      return { ...state, isDrawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false };
    default:
      return state;
  }
};
