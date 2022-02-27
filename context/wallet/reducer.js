const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT": {
      return {
          ...state,
          account: action.payload
      };
    }
    case "ACCOUNT_CHANGE": {
      return {
        ...state,
        account: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer