import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import routes from '../../routes';


const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { data: { token } } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify({ username: values.username, token }));
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
                  <h1 className="auth-header">Log In</h1>
                </div>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.FloatingLabel
                    controlId="username"
                    label="Username"
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
                    label="Password"
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
                    <Form.Control.Feedback type="invalid" tooltip>The username or password is incorrect</Form.Control.Feedback>
                  </Form.FloatingLabel>
                  <div className="d-flex justify-content-end">
                    <Button type="submit" variant="dark" className="mt-3">Submit</Button>
                  </div>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <a href="/signup">Sign Up</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;