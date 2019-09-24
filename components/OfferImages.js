import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import translations from '../translations/arabicTranslation';
import DialogTitle from './DialogTitle';

const OfferImages = ({ onClose, open, images }) => {
  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle onClose={onClose}>{translations.IMAGES_OFFERS}</DialogTitle>
      <DialogContent dividers>
        <div>
          <GridList cols={3}>
            {images.map(({ url, imageId }) => (
              <GridListTile key={imageId}>
                <img src={url} alt={translations.IMAGES_OFFERS} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OfferImages;
