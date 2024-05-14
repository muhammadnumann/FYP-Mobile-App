const initialState = {
  user: null,
  token: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state, //copy all previous states
        user: action.payload,
      };
    case "REGISTER":
      return {
        ...state, //copy all previous states
        user: action.payload,
      };
    case "TOKEN":
      return {
        ...state, //copy all previous states
        token: action.payload,
      };

    case "LOADING":
      return {
        ...state, //copy all previous states
        loading: action.payload,
      };
    case "LOGOUT":
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};
