import React from 'react';
import nextCookie from 'next-cookies';
import { Provider } from 'react-redux';
import { create } from 'jss';
import rtl from 'jss-rtl';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { initStore } from '../redux/store';
import Header from '../components/Header';
import translations from '../translations/arabicTranslation';
import { storeAdminData } from '../redux/actions/authActions';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let { token } = nextCookie(ctx);
    if (token) token = JSON.parse(token);
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      },
      token
    };
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.store.dispatch(storeAdminData(this.props.token));
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Head>
            <title>{translations.TITLE}</title>
          </Head>
          <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {this.props.token ? (
                <Header>
                  <Component {...pageProps} />
                </Header>
              ) : (
                <Component {...pageProps} />
              )}
            </ThemeProvider>
          </StylesProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
