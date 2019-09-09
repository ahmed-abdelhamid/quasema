import React from 'react';

import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';

import EmailIcon from 'mdi-material-ui/Email';
import CellphoneAndroidIcon from 'mdi-material-ui/CellphoneAndroid';
import FileDocumentIcon from 'mdi-material-ui/FileDocument';
import CityIcon from 'mdi-material-ui/City';
import WebIcon from 'mdi-material-ui/Web';
import TwitterIcon from 'mdi-material-ui/Twitter';
import InstagramIcon from 'mdi-material-ui/Instagram';
import PencilIcon from 'mdi-material-ui/Pencil';
import MapMarkerIcon from 'mdi-material-ui/MapMarker';

import translations from '../translations/arabicTranslation';
import DialogTitle from './DialogTitle';

const ShowDetailsDialog = ({ onClose, open, client }) => {
  const LIST_ITEMS = [
    { name: translations.EMAIL, value: client.email, icon: <EmailIcon /> },
    { name: translations.MOBILE_NUMBER, value: client.mobile, icon: <CellphoneAndroidIcon /> },
    { name: translations.MOI_NUMBER, value: client.moi_Id, icon: <FileDocumentIcon /> },
    { name: translations.CITY, value: client.city, icon: <CityIcon /> },
    { name: translations.WEB_URL, value: client.webUrl, icon: <WebIcon /> },
    { name: translations.TWITTER, value: client.twitter, icon: <TwitterIcon /> },
    { name: translations.INSTGRAM, value: client.instgram, icon: <InstagramIcon /> },
    { name: translations.DESCRIPTION, value: client.description, icon: <PencilIcon /> }
  ];

  const renderLocationIcon = () => {
    if (!client.lat && !client.lag) {
      return translations.NOTHING;
    }

    return (
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${client.lat},${client.lag}`}
        target="_blank"
      >
        <IconButton color="secondary" style={{ padding: 0 }}>
          <MapMarkerIcon />
        </IconButton>
      </Link>
    );
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle onClose={onClose}>{client.name}</DialogTitle>
      <DialogContent dividers>
        <List>
          {LIST_ITEMS.map(({ name, value, icon }) => (
            <ListItem key={name}>
              <ListItemIcon>{icon}</ListItemIcon>
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
          <ListItem>
            <ListItemIcon>
              <MapMarkerIcon />
            </ListItemIcon>
            <ListItemText>
              <Grid container spacing={2}>
                <Grid item sm={5}>
                  {translations.LOCATION}:
                </Grid>
                <Grid item sm={7}>
                  {renderLocationIcon()}
                </Grid>
              </Grid>
            </ListItemText>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ShowDetailsDialog;
