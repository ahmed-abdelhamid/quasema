import React from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ClientsTableButtons from './ClientsTableButtons';
import translations from '../translations/arabicTranslation';
import useStyles from '../styles/clientsPage';

const ClientsTable = ({ clients }) => {
  const classes = useStyles();

  if (clients.length === 0) {
    return (
      <Typography className={classes.info} align="center" gutterBottom>
        {translations.NOTHING}
      </Typography>
    );
  }

  return (
    <Table dir="rtl">
      <TableHead>
        <TableRow>
          <TableCell>{translations.NAME}</TableCell>
          <TableCell>{translations.MOI_NUMBER}</TableCell>
          <TableCell>{translations.CITY}</TableCell>
          <TableCell>{translations.MOBILE_NUMBER}</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {clients.map(({ user, company }) => (
          <TableRow key={user.userId}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{company.moi_Id}</TableCell>
            <TableCell>{user.city}</TableCell>
            <TableCell>{user.mobile}</TableCell>
            <TableCell align="center">
              <ClientsTableButtons client={{ ...user, ...company }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;
