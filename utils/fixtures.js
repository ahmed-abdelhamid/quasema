import React from 'react';
import translations from '../translations/arabicTranslation';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';

export const MENU_TABS = [
  { text: translations.HOME, icon: <HomeIcon />, link: '/' },
  { text: translations.CLIENTS, icon: <PersonIcon />, link: '/clients' }
];
