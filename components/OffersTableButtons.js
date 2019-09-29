import React, { useState } from 'react';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';

import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCardDetailsIcon from 'mdi-material-ui/AccountCardDetails';
import CheckboxMarkedCircleOutlineIcon from 'mdi-material-ui/CheckboxMarkedCircleOutline';
import CancelIcon from 'mdi-material-ui/Cancel';
import ImageIcon from 'mdi-material-ui/Image';

import translations from '../translations/arabicTranslation';
import OfferDetails from './OfferDetails';
import OfferImages from './OfferImages';
import { changeOfferState, changeOfferFeature } from '../utils/offers';
import { saveChangeCompanyState } from '../redux/actions/clientsActions';

const OffersTableButtons = ({ offer }) => {
  const [openOfferDetails, setOpenOfferDetails] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [checked, setChecked] = useState(offer.isFeature);
  const router = useRouter();

  const handleChangeState = async (id, validity) => {
    await changeOfferState(id, validity);
    Router.push(router.asPath);
  };

  const handleChangeFeature = async (id, feature) => {
    await changeOfferFeature(id, feature);
    setChecked(!checked);
  };

  return (
    <>
      <Tooltip title={translations.SHOW_DETAILS}>
        <IconButton color="primary" onClick={() => setOpenOfferDetails(true)}>
          <AccountCardDetailsIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={translations.SHOW_IMAGES}>
        <span>
          <IconButton
            color="primary"
            onClick={() => setOpenImages(true)}
            disabled={offer.image.length === 0}
          >
            <ImageIcon />
          </IconButton>
        </span>
      </Tooltip>

      {!offer.vaild && (
        <Tooltip title={translations.ACTIVATE}>
          <IconButton color="primary" onClick={() => handleChangeState(offer.productId, true)}>
            <CheckboxMarkedCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}

      {offer.vaild && (
        <Tooltip title={translations.DEACTIVATE}>
          <IconButton color="secondary" onClick={() => handleChangeState(offer.productId, false)}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title={checked ? translations.REMOVE_FROM_BEST : translations.TRANSFER_TO_BEST}>
        <Switch
          color="primary"
          checked={checked}
          onChange={event => handleChangeFeature(offer.productId, event.target.checked)}
        />
      </Tooltip>

      {openOfferDetails && (
        <OfferDetails
          open={openOfferDetails}
          onClose={() => setOpenOfferDetails(false)}
          offer={offer}
        />
      )}

      {openImages && (
        <OfferImages open={openImages} onClose={() => setOpenImages(false)} images={offer.image} />
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
)(OffersTableButtons);
