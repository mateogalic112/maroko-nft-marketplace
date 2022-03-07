const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT": {
      return {
          ...state,
          account: action.payload.account,
          signer: action.payload.signer,
          contract: action.payload.contract
      };
    }
    case "ACCOUNT_CHANGE": {
      return {
        ...state,
        account: action.payload.account,
        signer: action.payload.signer
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer