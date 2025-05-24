const initialState = {
  history: [],
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRANSACTION_HISTORY':
      return {
        ...state,
        history: action.data,
      };
    default:
      return state;
  }
};

export default transactionReducer;
