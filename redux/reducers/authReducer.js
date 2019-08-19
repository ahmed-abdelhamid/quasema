export default (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      const { adminId, email, mobile } = action.payload;
      return { adminId, email, mobile };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
