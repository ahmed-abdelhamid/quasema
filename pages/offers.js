import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import nextCookie from 'next-cookies';
import { useRouter } from 'next/router';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';

import useStyles from '../styles/clientsPage';
import translations from '../translations/arabicTranslation';
import { redirectOnError } from '../utils/auth';
import { getAllOffers, getOffersForClient, filterOffers } from '../utils/offers';
import { saveAllOffers, removeAllOffers } from '../redux/actions/offersActions';
import OffersTable from '../components/OffersTable';
import OfferFilters from '../components/OffersFilters';

const Offers = ({ offers, saveAllOffers, removeAllOffers }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(offers.size);
  const router = useRouter();

  useEffect(() => {
    return removeAllOffers;
  }, [removeAllOffers]);

  const handleChangePage = async (_event, newPage) => {
    let offers;
    if (router.query.id) {
      offers = await getOffersForClient(router.query.id, rowsPerPage, newPage);
    } else {
      offers = await getAllOffers(rowsPerPage, newPage);
    }

    saveAllOffers(offers);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async event => {
    let offers;
    if (router.query.id) {
      offers = await getOffersForClient(router.query.id, +event.target.value);
    } else {
      offers = await getAllOffers(+event.target.value);
    }

    saveAllOffers(offers);
    setPage(0);
    setRowsPerPage(+event.target.value);
  };

  return (
    <Container>
      <Typography variant="h1" align="center" className={classes.title}>
        {translations.OFFERS}
      </Typography>

      {offers.content.length === 0 && (
        <Paper className={classes.paper}>
          <Typography variant="h4">{translations.NO_OFFERS}</Typography>
        </Paper>
      )}

      {offers.content.length !== 0 && (
        <>
          <OfferFilters />
          <Paper>
            <OffersTable offers={offers.content} />
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={offers.totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) =>
                translations.labelDisplayedRows({ from, to, count })
              }
              labelRowsPerPage={translations.ROWS_PER_PAGE}
            />
          </Paper>
        </>
      )}
    </Container>
  );
};

Offers.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  if (token) {
    let offers;
    if (ctx.query.id) {
      offers = await getOffersForClient(ctx.query.id);
    } else {
      offers = await getAllOffers();
    }
    ctx.store.dispatch(saveAllOffers(offers));
    return {};
  }

  return redirectOnError(ctx);
};

const mapStateToProps = state => ({ offers: filterOffers(state.offers, state.filters) });

const mapDispatchToProps = dispatch => ({
  removeAllOffers: () => dispatch(removeAllOffers()),
  saveAllOffers: offers => dispatch(saveAllOffers(offers))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offers);
