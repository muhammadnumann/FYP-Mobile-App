const initialState = {
  loadAudios: false,
  realAudios: null,
  fakeAudios: null,
  dashDetail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "REAL_AUDIOS":
      return {
        ...state, //copy all previous states
        realAudios: action.payload,
      };
    case "FAKE_AUDIOS":
      return {
        ...state, //copy all previous states
        fakeAudios: action.payload,
      };
    case "LOAD_AUDIOS":
      return {
        ...state, //copy all previous states
        loadAudios: action.payload,
      };
    default:
      return state;
  }
};
