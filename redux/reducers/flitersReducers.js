const initialState = { filterClientsBy: '', filterOffersBy: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PROFIT':
      return { ...state, filterClientsBy: 'profit' };
    case 'NON_PROFIT':
      return { ...state, filterClientsBy: 'nonProfit' };
    case 'ALL':
      return { ...state, filterClientsBy: '' };
    case 'BEST_OFFERS':
      return { ...state, filterOffersBy: 'bestOffers' };
    case 'ALL_OFFERS':
      return { ...state, filterOffersBy: 'all' };
    case 'HOUSING':
      return { ...state, filterOffersBy: 'housing' };
    case 'COFFEE_SHOPS':
      return { ...state, filterOffersBy: 'coffeeShops' };
    case 'CLINICS':
      return { ...state, filterOffersBy: 'clinics' };
    case 'TRAVEL':
      return { ...state, filterOffersBy: 'travel' };
    case 'BEAUTY_CENTERS':
      return { ...state, filterOffersBy: 'beautyCenters' };
    case 'SHOPPING':
      return { ...state, filterOffersBy: 'shopping' };
    case 'FAMILIES':
      return { ...state, filterOffersBy: 'families' };
    case 'COURSES':
      return { ...state, filterOffersBy: 'courses' };
    case 'OTHERS':
      return { ...state, filterOffersBy: 'others' };
    case 'BEST_SALES':
      return { ...state, filterOffersBy: 'bestSales' };
    case 'BEST_RATES':
      return { ...state, filterOffersBy: 'bestRates' };
    case 'LESS_THAN_THIRTY':
      return { ...state, filterOffersBy: 'lessThanThirty' };
    case 'CHARITY':
      return { ...state, filterOffersBy: 'charity' };
    default:
      return state;
  }
};
