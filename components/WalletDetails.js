import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import translations from '../translations/arabicTranslation';
import DialogTitle from './DialogTitle';
import { getWalletDetails, withdrawFromWallet } from '../utils/wallet';
import { startLoading, endLoading } from '../redux/actions/loadingActions';

const useStyles = makeStyles(theme => ({
  textCentre: {
    textAlign: 'center'
  }
}));

const WalletDetails = ({ onClose, open, client, loading, startLoading, endLoading, adminId }) => {
  const classes = useStyles();
  const [wallet, setWallet] = useState(null);
  const [withdraw, setWithdraw] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const walletData = await getWalletDetails(client.companyId);
      setWallet(walletData);
    };
    fetchData();
  }, [client.companyId]);

  const handleWithdraw = async () => {
    try {
      startLoading();
      await withdrawFromWallet(adminId, client.companyId, withdraw);
      setMessage(translations.WITHDRAW_SUCCESS);
      setWithdraw('');
      const walletData = await getWalletDetails(client.companyId);
      setWallet(walletData);
      endLoading();
    } catch (e) {
      endLoading();
      setMessage(translations.FAILED_WITHDRAW);
      setError(true);
    }
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs" fullWidth>
      <DialogTitle onClose={onClose}>{client.name}</DialogTitle>
      <DialogContent dividers className={clsx({ [classes.textCentre]: !wallet })}>
        {!wallet && <CircularProgress />}
        {wallet && (
          <List>
            <ListItem>
              <ListItemText>
                <Grid container spacing={2}>
                  <Grid item sm={9}>
                    {translations.TOTAL_PROFIT}:
                  </Grid>
                  <Grid item sm={3}>
                    {wallet.profit} SAR
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>

            {!client.isNonProfit && (
              <ListItem>
                <ListItemText>
                  <Grid container spacing={2}>
                    <Grid item sm={9}>
                      {translations.COMISSION}:
                    </Grid>
                    <Grid item sm={3}>
                      {wallet.commission} SAR
                    </Grid>
                  </Grid>
                </ListItemText>
              </ListItem>
            )}

            <ListItem>
              <ListItemText>
                <Grid container spacing={2}>
                  <Grid item sm={9}>
                    {translations.TRANSFERRED_PROFIT}:
                  </Grid>
                  <Grid item sm={3}>
                    {wallet.transferredProfit} SAR
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText style={{ color: 'red' }}>
                <Grid container spacing={2}>
                  <Grid item sm={9}>
                    {translations.CURRENT_BALANCE}:
                  </Grid>
                  <Grid item sm={3}>
                    {wallet.currentBalnce} SAR
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>

            <ListItem>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!withdraw || withdraw <= 0 || loading}
                    onClick={handleWithdraw}
                  >
                    {translations.WITHDRAW}
                  </Button>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    value={withdraw}
                    onChange={e => setWithdraw(e.target.value)}
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">SAR</InputAdornment>
                    }}
                    error={withdraw < 0}
                    helperText={withdraw < 0 && translations.LOWER_ZERO}
                  />
                </Grid>
              </Grid>
            </ListItem>
          </List>
        )}

        {message && (
          <Typography align="center" color={error ? 'error' : 'initial'}>
            {message}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  loading: state.loading,
  adminId: state.auth.adminId
});

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  endLoading: () => dispatch(endLoading())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletDetails);
