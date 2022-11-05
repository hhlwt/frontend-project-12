import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import routes from '../../routes';
import { useTranslation } from 'react-i18next';


const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const {t} = useTranslation();
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        logIn();
        navigate('/', { replace: true });
      } catch (err) { 
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        throw err;
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
                  <h1 className="auth-header">{t('authorization.header')}</h1>
                </div>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.FloatingLabel
                    controlId="username"
                    label={t('authorization.usernamePlaceholder')}
                    className="mb-3"
                  >
                    <Form.Control
                      className='auth-input'
                      placeholder="Username"
                      name="username"
                      isInvalid={authFailed}
                      required
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </Form.FloatingLabel>
                  <Form.FloatingLabel
                    controlId="password"
                    label={t('authorization.passwordPlaceholder')}
                    className="mb-3"
                  >
                    <Form.Control 
                      className='auth-input'
                      placeholder="Password"
                      name="password"
                      isInvalid={authFailed}
                      type="password"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{t('authorization.authInvalidFeedback')}</Form.Control.Feedback>
                  </Form.FloatingLabel>
                  <div className="d-flex justify-content-end">
                    <Button type="submit" variant="dark" className="mt-3">{t('authorization.submit')}</Button>
                  </div>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <Link to='/signup'>{t('authorization.footer')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;