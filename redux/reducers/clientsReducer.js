export default (state = [], action) => {
  switch (action.type) {
    case 'SAVE_ALL':
      return action.companies;
    case 'CHANGE_STATE':
      return state.filter(({ user }) => user.userId !== action.company.userId);
    case 'REMOVE_ALL':
      return [];
    default:
      return state;
  }
};
