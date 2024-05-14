const initialState = {
  newJobs: null,
  inProgressJobs: null,
  cancelledJobs: null,
  completedJobs: null,
  loadJobs: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "NEW_JOBS":
      return {
        ...state, //copy all previous states
        newJobs: action.payload,
      };
    case "IN_PROGRESS_JOBS":
      return {
        ...state, //copy all previous states
        inProgressJobs: action.payload,
      };
    case "COMPLETED_JOBS":
      return {
        ...state, //copy all previous states
        completedJobs: action.payload,
      };
    case "CANCELLED_JOBS":
      return {
        ...state, //copy all previous states
        cancelledJobs: action.payload,
      };
    case "LOAD_JOBS":
      return {
        ...state, //copy all previous states
        loadJobs: action.payload,
      };
    default:
      return state;
  }
};
