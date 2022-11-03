import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import * as Yup from 'yup';
import routes from '../../routes';

const Signup = () => {
  const [signupFailed, setSignupFailed] = useState(false);
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
        .min(3, 'Username must be 3 to 20 characters')
        .max(20, 'Username must be 3 to 20 characters')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        logIn();
        navigate('/', { replace: true });
      } catch (err){
        formik.setSubmitting(false);
        setSignupFailed(true);
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
                  <h1 className="auth-header">Sign up</h1>
                </div>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.FloatingLabel
                    controlId="username"
                    label="Username"
                    className="mb-4"
                  >
                    <Form.Control
                      className='auth-input'
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
                    label="Password"
                    className="mb-4"
                  >
                    <Form.Control
                      className='auth-input'
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
                    label="Password Confirmation"
                    className="mb-2"
                  >
                    <Form.Control
                      className='auth-input'
                      placeholder="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                      isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passwordConfirmation}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.passwordConfirmation}</Form.Control.Feedback>
                  </Form.FloatingLabel>
                  {signupFailed ? <div className='text-danger'>User already exists</div> : null}
                  <div className="d-flex justify-content-end">
                    <Button type="submit" variant="dark" className="mt-3">Sign up</Button>
                  </div>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;