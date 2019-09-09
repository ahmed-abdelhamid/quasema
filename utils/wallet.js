import axios from 'axios';

export const getWalletDetails = async id => {
  const { data } = await axios.get(`${process.env.API_URL}/order/${id}/wallet`);

  return data;
};

export const withdrawFromWallet = async (adminId, companyId, amount) => {
  await axios.get(`${process.env.API_URL}/order/${companyId}/withdrawWallet/${adminId}/${amount}`);
};
