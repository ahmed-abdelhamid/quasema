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

// export const filterOffers = (offers, filters) => {
//   switch (filters.filterOffersBy) {
//     case 'allOffers':
//       return offers;
//     case 'housing':
//       const filteredOffers = offers.content.filter(
//         ({ productType }) => productType.productTypeId === 1
//       );
//       return { ...offers, content: filteredOffers };
//     case 'coffeeShops':
//     case 'clinics':
//     case 'travel':
//     case 'beautyCenters':
//     case 'shopping':
//     case 'families':
//     case 'courses':
//     case 'others':
//     case 'bestSales':
//     case 'bestRates':
//     case 'lessThanThirty':
//     case 'charity':
//     case 'bestOffers':
//     default:
//       return offers;
//   }
// };
