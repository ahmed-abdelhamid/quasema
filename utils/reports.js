import axios from 'axios';

export const getAllReports = async (pageSize = 10, pageNumber = 0) => {
  const { data } = await axios.get(
    `${process.env.API_URL}/complain/getallComplains?size=${pageSize}&page=${pageNumber}`
  );

  return data;
};
