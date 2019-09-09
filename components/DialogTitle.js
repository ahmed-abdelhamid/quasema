import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'mdi-material-ui/Close';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

const DialogTitle = ({ children, onClose }) => {
  const classes = useStyles();

  return (
    <MuiDialogTitle className={classes.title}>
      {children}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
};

export default DialogTitle;
