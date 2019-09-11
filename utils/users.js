import axios from 'axios';

export const getAllUsers = async () => {
  const { data } = await axios.get(`${process.env.API_URL}/user/getonlyuser`);

  return data;
};
