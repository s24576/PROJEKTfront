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
            const response = await axios.post('http://localhost:3001/api/register', values);
            
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
        <div>
            <Formik
                initialValues={{ email: '', password: '', password2: '' }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <label htmlFor="password">Hasło:</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div>
                            <label htmlFor="password2">Powtórz hasło:</label>
                            <Field type="password" id="password2" name="password2" />
                            <ErrorMessage name="password2" component="div" />
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting}>
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
