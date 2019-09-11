export default (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_ALL_REPORTS':
      return action.reports;
    case 'REMOVE_ALL_REPORTS':
      return {};
    default:
      return state;
  }
};
