import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import * as yup from 'yup';
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
    validationSchema: yup.object({
      username: yup.string()
        .required('This field is required'),
      password: yup.string()
        .required('This field is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userToken', JSON.stringify(response.data.token));
        logIn()
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
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-5">
          <Form onSubmit={formik.handleSubmit} className="p-4">
            <fieldset disabled={formik.isSubmitting}>
              <Form.FloatingLabel
                controlId="username"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  className='gth'
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
                  placeholder="Password"
                  name="password"
                  isInvalid={authFailed}
                  type="password"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <Form.Control.Feedback type="invalid">The username or password is incorrect</Form.Control.Feedback>
              </Form.FloatingLabel>
              <Button type="submit" variant="dark">Submit</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;