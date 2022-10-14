import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      pass: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .required('This field is required'),
      pass: yup.string()
        .required('This field is required'),
    }),
    onSubmit: values => {
      alert('Submitted!');
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">User name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name ? <div>{formik.errors.name}</div> : null}

      <label htmlFor="pass">Password</label>
      <input
        id="pass"
        name="pass"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.pass}
      />
      <br />
      {formik.errors.pass ? <div>{formik.errors.pass}</div> : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;