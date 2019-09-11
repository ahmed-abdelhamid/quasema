import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import translations from '../translations/arabicTranslation';
import DialogTitle from './DialogTitle';
import OrdersTable from './OrdersTable';
import { getOrdersForUser } from '../utils/orders';

const useStyles = makeStyles(theme => ({
  textCentre: {
    textAlign: 'center'
  }
}));

const WalletDetails = ({ user, onClose, open }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrdersForUser(user.userId);
      setOrders(response);
    };
    fetchData();
  }, [user.userId]);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="lg">
      <DialogTitle onClose={onClose}>{user.name}</DialogTitle>
      <DialogContent dividers className={clsx({ [classes.textCentre]: !orders })}>
        {!orders && <CircularProgress />}
        {orders && orders.content.length === 0 && (
          <Typography align="center" variant="h6">
            {translations.NO_ORDERS}
          </Typography>
        )}
        {orders && orders.content.length > 0 && (
          <OrdersTable orders={orders} userId={user.userId} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WalletDetails;
