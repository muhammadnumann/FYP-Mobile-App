const initialState = {
  isDrawerOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      return { ...state, isDrawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false };
    default:
      return state;
  }
};
