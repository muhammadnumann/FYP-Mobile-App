const initialState = {
  loadAudios: false,
  realAudios: null,
  activeBookings: null,
  completedBookings: null,
  cancelledBookings: null,
  inprogressBookings: null,
  loadBookings: false,
  dashDetail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "REAL_AUDIOS":
      return {
        ...state, //copy all previous states
        realAudios: action.payload,
      };
    case "LOAD_AUDIOS":
      return {
        ...state, //copy all previous states
        loadAudios: action.payload,
      };

    case "ACTIVE_BOOKINGS":
      return {
        ...state, //copy all previous states
        activeBookings: action.payload,
      };

    case "INPROGRESS_BOOKINGS":
      return {
        ...state, //copy all previous states
        inprogressBookings: action.payload,
      };
    case "COMPLETED_BOOKINGS":
      return {
        ...state, //copy all previous states
        completedBookings: action.payload,
      };
    case "CANCELLED_BOOKINGS":
      return {
        ...state, //copy all previous states
        cancelledBookings: action.payload,
      };

    case "DASHBOARD_DETAILS":
      return {
        ...state, //copy all previous states
        dashDetail: action.payload,
      };
    case "LOAD_BOOKINGS":
      return {
        ...state, //copy all previous states
        loadBookings: action.payload,
      };

    default:
      return state;
  }
};
