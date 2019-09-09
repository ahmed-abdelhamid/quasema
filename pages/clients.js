import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import nextCookie from 'next-cookies';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TimerIcon from 'mdi-material-ui/Timer';
import CancelIcon from 'mdi-material-ui/Cancel';
import CheckboxMarkedCircleOutlineIcon from 'mdi-material-ui/CheckboxMarkedCircleOutline';

import useStyles from '../styles/clientsPage';
import translations from '../translations/arabicTranslation';
import { redirectOnError } from '../utils/auth';
import {
  getPendingCompanies,
  getActiveCompanies,
  getInactiveCompanies,
  filterCompanies
} from '../utils/clients';
import { saveAllCompanies, removeAllCompanies } from '../redux/actions/clientsActions';
import ClientsTable from '../components/ClientsTable';
import ClientsFilters from '../components/ClientsFilters';

const Clients = ({ clients, removeAllCompanies, saveAllCompanies, companies }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    return removeAllCompanies;
  }, [removeAllCompanies]);

  const findRelatedCompanies = async (_event, newValue) => {
    let companies = [];
    setTabValue(newValue);

    switch (newValue) {
      case 2:
        companies = await getInactiveCompanies();
        break;
      case 1:
        companies = await getActiveCompanies();
        break;
      case 0:
        companies = await getPendingCompanies();
        break;
      default:
        companies = [];
    }
    saveAllCompanies(companies);
  };

  return (
    <Container>
      <Typography variant="h1" align="center" className={classes.title}>
        {translations.CLIENTS}
      </Typography>

      <ClientsFilters />

      <Paper>
        <Tabs
          value={tabValue}
          onChange={findRelatedCompanies}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<TimerIcon />} label={translations.PENDING} />
          <Tab icon={<CheckboxMarkedCircleOutlineIcon />} label={translations.ACTIVE} />
          <Tab icon={<CancelIcon />} label={translations.INACTIVE} />
        </Tabs>

        <ClientsTable clients={clients} />
      </Paper>
    </Container>
  );
};

Clients.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  if (token) {
    const companies = await getPendingCompanies();
    ctx.store.dispatch(saveAllCompanies(companies));
    return { companies };
  }

  return redirectOnError(ctx);
};

const mapStateToProps = state => ({ clients: filterCompanies(state.clients, state.filters) });

const mapDispatchToProps = dispatch => ({
  removeAllCompanies: () => dispatch(removeAllCompanies()),
  saveAllCompanies: companies => dispatch(saveAllCompanies(companies))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
