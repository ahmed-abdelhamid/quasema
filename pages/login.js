import React from 'react';
import axios from 'axios';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from '../styles/loginPage';
import { login } from '../utils/auth';
import translations from '../translations/arabicTranslation';

const validationSchema = Yup.object({
  mobileOrEmail: Yup.string('').required(translations.REQUIRED_FILED),
  password: Yup.string('').required(translations.REQUIRED_FILED)
});

const Index = ({
  values: { mobileOrEmail, password },
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  isSubmitting
}) => {
  const classes = useStyles();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {translations.LOGIN}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            id="mobileOrEmail"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={translations.EMAIL_OR_PHONE}
            name="mobileOrEmail"
            autoFocus
            helperText={touched.mobileOrEmail ? errors.mobileOrEmail : ''}
            error={touched.mobileOrEmail && !!errors.mobileOrEmail}
            value={mobileOrEmail}
            onChange={change.bind(null, 'mobileOrEmail')}
          />
          <TextField
            id="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={translations.PASSWORD}
            type="password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && !!errors.password}
            value={password}
            onChange={change.bind(null, 'password')}
          />
          {errors.credentials && (
            <Typography color="secondary" align="center">
              {errors.credentials}
            </Typography>
          )}
          <div className={classes.loadingWrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!isValid || isSubmitting}
            >
              {translations.LOGIN}
            </Button>
            {isSubmitting && (
              <CircularProgress size={24} className={classes.loading} />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default withFormik({
  displayName: 'LoginForm',
  mapPropsToValues: () => ({ mobileOrEmail: '', password: '' }),
  validationSchema,
  handleSubmit: async (
    { mobileOrEmail, password },
    { setSubmitting, setFieldError }
  ) => {
    try {
      const { data: token } = await axios.post(
        `${process.env.API_URL}/admin/login`,
        {
          mobileOrEmail,
          password
        }
      );
      login({ token });
    } catch (e) {
      setFieldError('credentials', translations.CREDENTIALS_ERROR);
      setSubmitting(false);
    }
  }
})(Index);
