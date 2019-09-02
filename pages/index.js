import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { withAuthSync } from '../utils/auth';

const Index = () => {
  return <h1>Hello from Index</h1>;
};

Index.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () => {
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { location: '/login' }).end();
  };

  const redirectOnSuccess = () => {
    typeof window !== 'undefined'
    ? Router.push('/clients')
    : ctx.res.writeHead(302, { location: '/clients' }).end();
  }

  if (token) {
    return redirectOnSuccess()
  }

  return redirectOnError();
};

export default withAuthSync(Index);
