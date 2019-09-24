import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Rating from '@material-ui/lab/Rating';

import OffersTableButtons from './OffersTableButtons';
import translations from '../translations/arabicTranslation';

const OffersTable = ({ offers }) => {
  return (
    <Table dir="rtl">
      <TableHead>
        <TableRow>
          <TableCell>{translations.OFFER_NAME}</TableCell>
          <TableCell>{translations.OFFER_PROVIDER_NAME}</TableCell>
          <TableCell>{translations.OFFER_PRICE}</TableCell>
          <TableCell>{translations.OFFER_RATE}</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {offers.map(offer => (
          <TableRow key={offer.productId}>
            <TableCell>{offer.title}</TableCell>
            <TableCell>{offer.company.user.name}</TableCell>
            <TableCell>SAR {offer.newPrice}</TableCell>
            <TableCell>
              <Rating value={offer.avgRate} readOnly size="small" />
            </TableCell>
            <TableCell align="center">
              <OffersTableButtons offer={offer} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OffersTable;
