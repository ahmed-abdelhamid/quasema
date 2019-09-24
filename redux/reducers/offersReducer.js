export default (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_ALL_OFFERS':
      return action.offers;
    // case 'CHANGE_STATE':
    //   return state.filter(({ user }) => user.userId !== action.company.userId);
    case 'REMOVE_ALL_OFFERS':
      return {};
    default:
      return state;
  }
};
