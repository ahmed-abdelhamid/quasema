import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import nextCookie from 'next-cookies';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import useStyles from '../styles/clientsPage';
import translations from '../translations/arabicTranslation';
import { redirectOnError } from '../utils/auth';
import { saveAllUsers, removeAllUsers } from '../redux/actions/usersActions';
import UsersTable from '../components/UsersTable';
import { getAllUsers } from '../utils/users';

const Users = ({ users, removeAllUsers }) => {
  const classes = useStyles();

  useEffect(() => {
    return removeAllUsers;
  }, [removeAllUsers]);

  return (
    <Container>
      <Typography variant="h1" align="center" className={classes.title}>
        {translations.USERS}
      </Typography>

      <Paper>
        <UsersTable users={users} />
      </Paper>
    </Container>
  );
};

Users.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  if (token) {
    const users = await getAllUsers();
    ctx.store.dispatch(saveAllUsers(users));
    return {};
  }

  return redirectOnError(ctx);
};

const mapStateToProps = ({ users }) => ({ users });

const mapDispatchToProps = dispatch => ({
  removeAllUsers: () => dispatch(removeAllUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
