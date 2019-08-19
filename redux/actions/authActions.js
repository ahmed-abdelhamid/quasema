export const storeAdminData = admin => ({
  type: 'LOGIN',
  payload: admin
});

export const removeAdminData = () => ({ type: 'LOGOUT' });
