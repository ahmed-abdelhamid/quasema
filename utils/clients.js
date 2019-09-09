import axios from 'axios';

export const getPendingCompanies = async () => {
  const response = await axios.get(`${process.env.API_URL}/user/getallcompany/${true}/${false}`);

  return response.data;
};

export const getActiveCompanies = async () => {
  const response = await axios.get(`${process.env.API_URL}/user/getallcompany/${false}/${false}`);

  return response.data;
};

export const getInactiveCompanies = async () => {
  const response = await axios.get(`${process.env.API_URL}/user/getallcompany/${false}/${true}`);

  return response.data;
};

export const changeCompanyState = async (id, activity, pending) => {
  const response = await axios.put(
    `${process.env.API_URL}/user/changecompanystatus/${id}/${activity}/${pending}`
  );

  return response.data;
};

export const filterCompanies = (companies, filters) => {
  switch (filters.filterClientsBy) {
    case 'profit':
      return companies.filter(({ company }) => !company.isNonProfit);
    case 'nonProfit':
      return companies.filter(({ company }) => company.isNonProfit);
    default:
      return companies;
  }
};
