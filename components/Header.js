import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import MuiLink from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockReset from 'mdi-material-ui/LockReset';
import useStyles from '../styles/header';
import { logout } from '../utils/auth';
import translations from '../translations/arabicTranslation';
import { MENU_TABS } from '../utils/fixtures';

import ChangePassword from '../components/ChangePassword';

const Header = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerOpen
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {translations.HEADER_TITLE}
          </Typography>
          <Button color="inherit" onClick={logout}>
            <ExitToAppIcon className={classes.iconButton} />
            {translations.LOGOUT}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {MENU_TABS.map(({ text, icon, link }) => (
            <Link href={link} key={text}>
              <ListItem button>
                <ListItemIcon>
                  <Tooltip title={text}>{icon}</Tooltip>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
          <MuiLink underline="none" componet="button" onClick={() => setOpenChangePassword(true)}>
            <ListItem button>
              <ListItemIcon>
                <Tooltip title={translations.CHANGE_PASSWORD}>
                  <LockReset />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary={translations.CHANGE_PASSWORD} />
            </ListItem>
          </MuiLink>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>

      {openChangePassword && (
        <ChangePassword open={openChangePassword} onClose={() => setOpenChangePassword(false)} />
      )}
    </div>
  );
};

export default Header;
