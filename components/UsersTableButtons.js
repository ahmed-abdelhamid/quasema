import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCardDetailsIcon from 'mdi-material-ui/AccountCardDetails';
import CheckboxMarkedCircleOutlineIcon from 'mdi-material-ui/CheckboxMarkedCircleOutline';
import CancelIcon from 'mdi-material-ui/Cancel';
import SackPercentIcon from 'mdi-material-ui/SackPercent';
import WalletIcon from 'mdi-material-ui/Wallet';

import translations from '../translations/arabicTranslation';
import Orders from './Orders';
import ShowClientDetails from './ShowClientDetails';
import WalletDetails from './WalletDetails';
import { changeCompanyState } from '../utils/clients';
import { saveChangeCompanyState } from '../redux/actions/clientsActions';

const UsersTableButtons = ({ user }) => {
  const [openOrders, setOpenOrders] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpenOrders(true)}>
        {translations.PURCHASES}
      </Button>

      {openOrders && <Orders open={openOrders} onClose={() => setOpenOrders(false)} user={user} />}
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  saveChangeCompanyState: company => dispatch(saveChangeCompanyState(company))
});

export default connect(
  null,
  mapDispatchToProps
)(UsersTableButtons);
