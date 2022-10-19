const INITIAL_STATE = {
  user: [],
};

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE":
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
