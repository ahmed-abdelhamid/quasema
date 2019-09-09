const initialState = { filterClientsBy: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PROFIT':
      return { ...state, filterClientsBy: 'profit' };
    case 'NON_PROFIT':
      return { ...state, filterClientsBy: 'nonProfit' };
    case 'ALL':
      return { ...state, filterClientsBy: '' };
    default:
      return state;
  }
};
