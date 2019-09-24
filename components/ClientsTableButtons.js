import React, { useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCardDetailsIcon from 'mdi-material-ui/AccountCardDetails';
import CheckboxMarkedCircleOutlineIcon from 'mdi-material-ui/CheckboxMarkedCircleOutline';
import CancelIcon from 'mdi-material-ui/Cancel';
import SackPercentIcon from 'mdi-material-ui/SackPercent';
import WalletIcon from 'mdi-material-ui/Wallet';

import translations from '../translations/arabicTranslation';
import ShowClientDetails from './ShowClientDetails';
import WalletDetails from './WalletDetails';
import { changeCompanyState } from '../utils/clients';
import { saveChangeCompanyState } from '../redux/actions/clientsActions';

const ClientsTableButons = ({ client, saveChangeCompanyState }) => {
  const [openClientDetails, setOpenClientDetails] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);

  const activateClient = async () => {
    await changeCompanyState(client.userId, false, false);
    saveChangeCompanyState(client);
  };

  const deactivateClient = async () => {
    await changeCompanyState(client.userId, true, false);
    saveChangeCompanyState(client);
  };

  return (
    <>
      <Tooltip title={translations.SHOW_DETAILS}>
        <IconButton color="primary" onClick={() => setOpenClientDetails(true)}>
          <AccountCardDetailsIcon />
        </IconButton>
      </Tooltip>

      {!client.isPanding && (
        <>
          <Tooltip title={translations.OFFERS}>
            <span>
              <Link href={`/offers?id=${client.companyId}`}>
                <IconButton color="primary">
                  <SackPercentIcon />
                </IconButton>
              </Link>
            </span>
          </Tooltip>

          <Tooltip title={translations.WALLET}>
            <IconButton color="primary" onClick={() => setOpenWallet(true)}>
              <WalletIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      {(client.isLock || client.isPanding) && (
        <Tooltip title={translations.ACTIVATE} onClick={activateClient}>
          <IconButton color="primary">
            <CheckboxMarkedCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}

      {!client.isLock && !client.isPanding && (
        <Tooltip title={translations.DEACTIVATE} onClick={deactivateClient}>
          <IconButton color="secondary">
            <CancelIcon />
          </IconButton>
        </Tooltip>
      )}

      {openClientDetails && (
        <ShowClientDetails
          open={openClientDetails}
          onClose={() => setOpenClientDetails(false)}
          client={client}
        />
      )}

      {openWallet && (
        <WalletDetails open={openWallet} onClose={() => setOpenWallet(false)} client={client} />
      )}
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  saveChangeCompanyState: company => dispatch(saveChangeCompanyState(company))
});

export default connect(
  null,
  mapDispatchToProps
)(ClientsTableButons);
