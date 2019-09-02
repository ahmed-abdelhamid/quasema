import React from 'react';
import translations from '../translations/arabicTranslation';
import AccountTieIcon from 'mdi-material-ui/AccountTie'
import AccountGroupIcon from 'mdi-material-ui/AccountGroup'
import PercentIcon from 'mdi-material-ui/Percent'
import FileDocumentBoxMultipleIcon from 'mdi-material-ui/FileDocumentBoxMultiple'

export const MENU_TABS = [
  { text: translations.CLIENTS, icon: <AccountTieIcon />, link: '/clients' },
  { text: translations.USERS, icon: <AccountGroupIcon />, link: '/users' },
  { text: translations.OFFERS, icon: <PercentIcon />, link: '/offers' },
  { text: translations.REPORTS, icon: <FileDocumentBoxMultipleIcon />, link: '/reports' }
  ];
