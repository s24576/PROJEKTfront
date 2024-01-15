import React from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Nieprawidłowy adres email').required('Pole jest wymagane'),
  password: Yup.string().required('Pole jest wymagane'),
  password2: Yup.string()
    .required('Pole jest wymagane')
    .test('passwords-match', 'Hasła muszą być identyczne', function (value) {
      return this.parent.password === value;
    }),
});

function Register() {
  const navigate = useNavigate();
  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/user/register', values);

      if (response.data.message === 'Registration successful') {
        navigate('/login');
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Rejestracja</h2>
      <Formik
        initialValues={{ email: '', password: '', password2: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Hasło:
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password2" className="block text-sm font-medium text-gray-600">
                Powtórz hasło:
              </label>
              <Field
                type="password"
                id="password2"
                name="password2"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage name="password2" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Zarejestruj
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register;
