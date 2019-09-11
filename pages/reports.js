import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import nextCookie from 'next-cookies';

// Material UI Imports
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import ChevronDownIcon from 'mdi-material-ui/ChevronDown';

import translations from '../translations/arabicTranslation';
import { redirectOnError } from '../utils/auth';
import { removeAllReports, saveAllReports } from '../redux/actions/reportsActions';
import { getAllReports } from '../utils/reports';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 50,
    marginBottom: 25
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const Reports = ({ reports, saveAllReports, removeAllReports }) => {
  const classes = useStyles();

  useEffect(() => {
    return removeAllReports;
  }, [removeAllReports]);

  const [page, setPage] = useState(0);

  const handleChangePage = async (_event, newPage) => {
    const response = await getAllReports(reports.size, newPage);

    saveAllReports(response);
    setPage(newPage);
  };

  return (
    <Container>
      <Typography variant="h1" align="center" className={classes.title}>
        {translations.REPORTS}
      </Typography>

      {reports.content.map(report => (
        <ExpansionPanel key={report.complainId}>
          <ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <Typography className={classes.heading}>
                  {translations.USERNAME}: {report.user.name}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography>
                  {translations.QUASEMA_NAME}: {report.product.title}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography>
                  {translations.QUASEMA_PROVIDER_NAME}: {report.product.company.user.name}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography>
                  {translations.MOBILE_NUMBER}: {report.product.company.user.mobile}
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Typography>{report.complainText}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

      <TablePagination
        rowsPerPageOptions={[reports.size]}
        component="div"
        count={reports.totalElements}
        rowsPerPage={reports.size}
        page={page}
        onChangePage={handleChangePage}
        labelDisplayedRows={({ from, to, count }) =>
          translations.labelDisplayedRows({ from, to, count })
        }
      />
    </Container>
  );
};

Reports.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  if (token) {
    const reports = await getAllReports();
    ctx.store.dispatch(saveAllReports(reports));
    return {};
  }

  return redirectOnError(ctx);
};

const mapStateToProps = ({ reports }) => ({ reports });

const mapDispatchToProps = dispatch => ({
  removeAllReports: () => dispatch(removeAllReports()),
  saveAllReports: reports => dispatch(saveAllReports(reports))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports);
