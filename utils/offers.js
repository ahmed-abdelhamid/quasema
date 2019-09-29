import axios from 'axios';

// Get All Offers
export const getAllOffers = async (pageSize = 10, pageNumber = 0, filter = 0) => {
  const { data } = await axios.get(
    `${process.env.API_URL}/product/getfilterallproducts/${filter}?size=${pageSize}&page=${pageNumber}`
  );

  return data;
};

// Get All Offer for Specific Client
export const getOffersForClient = async (id, pageSize = 10, pageNumber = 0) => {
  const { data } = await axios.get(
    `${process.env.API_URL}/product/${id}/getCompanyproducts?size=${pageSize}&page=${pageNumber}`
  );

  return data;
};

// Change Offer State from Active to Inactive and Vice Versa
export const changeOfferState = async (id, validity) => {
  await axios.put(`${process.env.API_URL}/product/editProductstatus/${id}/${validity}`);
};

// Change Offer from Normal to Best Offer
export const changeOfferFeature = async (id, feature) => {
  await axios.put(`${process.env.API_URL}/product/editProductfeature/${id}/${feature}`);
};
