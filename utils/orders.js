import axios from 'axios';

export const getOrdersForUser = async (userId, pageSize = 5, pageNumber = 0) => {
  const { data } = await axios.get(
    `${process.env.API_URL}/order/getUserOrders/${userId}?size=${pageSize}&page=${pageNumber}`
  );

  return data;
};
