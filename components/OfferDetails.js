import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';

import translations from '../translations/arabicTranslation';
import DialogTitle from './DialogTitle';

const OfferDetails = ({ onClose, open, offer }) => {
  const LIST_ITEMS = [
    { name: translations.CATEGORY, value: offer.productType.name },
    { name: translations.ADDRESS, value: offer.address },
    { name: translations.OFFER_PRICE, value: offer.newPrice },
    { name: translations.OFFER_TYPE, value: offer.productType.name },
    { name: translations.AMOUNT, value: offer.amount },
    { name: translations.EXPIRY, value: offer.endDate },
    { name: translations.ILLUSTRATION, value: offer.description },
    { name: translations.WHY, value: '' }
  ];

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle onClose={onClose}>{offer.title}</DialogTitle>
      <DialogContent dividers>
        <List>
          {LIST_ITEMS.map(({ name, value }) => (
            <ListItem key={name}>
              <ListItemText>
                <Grid container spacing={2}>
                  <Grid item sm={5}>
                    {name}:
                  </Grid>
                  <Grid item sm={7}>
                    {value}
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDetails;
