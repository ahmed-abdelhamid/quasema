export default (state = [], action) => {
  switch (action.type) {
    case 'SAVE_ALL_USERS':
      return action.users;
    case 'REMOVE_ALL_USERS':
      return [];
    default:
      return state;
  }
};
