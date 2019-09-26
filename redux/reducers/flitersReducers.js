const initialState = { filterClientsBy: '', filterOffersBy: '0' };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PROFIT':
      return { ...state, filterClientsBy: 'profit' };
    case 'NON_PROFIT':
      return { ...state, filterClientsBy: 'nonProfit' };
    case 'ALL':
      return { ...state, filterClientsBy: '' };
    // case '32':
    case '31':
      return { ...state, filterOffersBy: '31' };
    case '0':
      return { ...state, filterOffersBy: '0' };
    case '1':
      return { ...state, filterOffersBy: '1' };
    case '2':
      return { ...state, filterOffersBy: '2' };
    case '3':
      return { ...state, filterOffersBy: '3' };
    case '4':
      return { ...state, filterOffersBy: '4' };
    case '5':
      return { ...state, filterOffersBy: '5' };
    case '6':
      return { ...state, filterOffersBy: '6' };
    case '7':
      return { ...state, filterOffersBy: '7' };
    case '8':
      return { ...state, filterOffersBy: '8' };
    case '9':
      return { ...state, filterOffersBy: '9' };
    // case 'BEST_SALES':
    //   return { ...state, filterOffersBy: 'bestSales' };
    // case '31':
    //   return { ...state, filterOffersBy: 'bestRates' };
    case '30':
      return { ...state, filterOffersBy: '30' };
    case '10':
      return { ...state, filterOffersBy: '10' };
    default:
      return state;
  }
};
