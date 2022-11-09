import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import { useRollbar } from '@rollbar/react';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

const Signup = () => {
  const { t } = useTranslation();
  const [processError, setProcessError] = useState('');
  const rollbar = useRollbar();
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('signUp.nameLength'))
        .max(20, t('signUp.nameLength'))
        .required(t('signUp.fieldIsRequired')),
      password: Yup.string()
        .min(6, t('signUp.passwordLength'))
        .required(t('signUp.fieldIsRequired')),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], t('signUp.passwordsMatch')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        logIn();
        navigate('/', { replace: true });
      } catch (err) {
        rollbar.error('SignUp error', err);
        formik.setSubmitting(false);
        if (err.code === 'ERR_NETWORK') {
          toast(t('toastify.networkErr'), {
            progressClassName: 'danger-progress-bar',
          });
          return;
        }
        setProcessError('userExists');
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-lg auth-backplate">
            <Card.Body className="row p-5">
              <Form onSubmit={formik.handleSubmit} className="p-4">
                <div className="text-center">
                  <h1 className="auth-header">{t('signUp.header')}</h1>
                </div>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.FloatingLabel
                    controlId="username"
                    label={t('signUp.usernamePlaceholder')}
                    className="mb-4"
                  >
                    <Form.Control
                      className="auth-input"
                      placeholder="Username"
                      name="username"
                      isInvalid={formik.touched.username && formik.errors.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                  </Form.FloatingLabel>
                  <Form.FloatingLabel
                    controlId="password"
                    label={t('signUp.passwordPlaceholder')}
                    className="mb-4"
                  >
                    <Form.Control
                      className="auth-input"
                      placeholder="Password"
                      name="password"
                      type="password"
                      isInvalid={formik.touched.password && formik.errors.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                  </Form.FloatingLabel>
                  <Form.FloatingLabel
                    controlId="passwordConfirmation"
                    label={t('signUp.passwordConfirmationPlaceholder')}
                    className="mb-2"
                  >
                    <Form.Control
                      className="auth-input"
                      placeholder="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                      isInvalid={formik.touched.passwordConfirmation
                         && formik.errors.passwordConfirmation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passwordConfirmation}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.passwordConfirmation}</Form.Control.Feedback>
                  </Form.FloatingLabel>
                  {processError ? <div className="text-danger">{t(`signUp.${processError}`)}</div> : null}
                  <div className="d-flex justify-content-end">
                    <Button type="submit" variant="dark" className="mt-3">
                      {formik.isSubmitting
                        ? (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : t('signUp.submit')}
                    </Button>
                  </div>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <Link to="/login">{t('signUp.footer')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
