import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import translations from '../translations/arabicTranslation';
import { getOrdersForUser } from '../utils/orders';

const OrdersTable = ({ orders, userId }) => {
  const [currentOrders, setCurrentOrders] = useState(orders.content);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(orders.size);

  const handleChangePage = async (_event, newPage) => {
    const orders = await getOrdersForUser(userId, rowsPerPage, newPage);
    setCurrentOrders(orders.content);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async event => {
    const orders = await getOrdersForUser(userId, +event.target.value);
    setCurrentOrders(orders.content);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Table dir="rtl">
        <TableHead>
          <TableRow>
            <TableCell>{translations.QUASEMA_NAME}</TableCell>
            <TableCell>{translations.QUASEMA_PROVIDER_NAME}</TableCell>
            <TableCell>{translations.QUASEMA_TYPE}</TableCell>
            <TableCell>{translations.QUASEMA_COST}</TableCell>
            <TableCell>{translations.QUASEMA_AMOUNT}</TableCell>
            <TableCell>{translations.QUASEMA_ORDER_NO}</TableCell>
            <TableCell>{translations.QUASEMA_ORDER_DATE}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {currentOrders.map(order => (
            <TableRow key={order.orderId}>
              <TableCell>{order.product.title}</TableCell>
              <TableCell>{order.product.company.user.name}</TableCell>
              <TableCell>{order.product.productType.name}</TableCell>
              <TableCell>{order.product.newPrice}</TableCell>
              <TableCell>{order.quntity}</TableCell>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.creationDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={orders.totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          translations.labelDisplayedRows({ from, to, count })
        }
        labelRowsPerPage={translations.ROWS_PER_PAGE}
      />
    </>
  );
};

export default OrdersTable;
