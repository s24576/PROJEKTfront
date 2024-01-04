import React, {} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Pole jest wymagane'),
    surname: Yup.string().required('Pole jest wymagane'),
    email: Yup.string().required('Pole jest wymagane'),
    number: Yup.string().required('Pole jest wymagane'),
    address: Yup.string().required('Pole jest wymagane'),
    code: Yup.string().required('Pole jest wymagane'),
    city: Yup.string().required('Pole jest wymagane'),
});

function FormS2(){
    const handleAdd = async (values, {setSubmitting})=>{

    }
    return(
        <div>
            <Formik
                initialValues={{name: '', surname: '', email: '', address: '', code: '', city: '', number: ''}}
                validationSchema={validationSchema}
                onSubmit={handleAdd}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Imię:</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <div>
                            <label htmlFor="surname">Nazwisko:</label>
                            <Field type="text" id="surname" surname="surname" />
                            <ErrorMessage surname="surname" component="div" />
                        </div>
                        <div>
                            <label htmlFor="email">Adres email:</label>
                            <Field type="text" id="email" email="email" />
                            <ErrorMessage email="email" component="div" />
                        </div>
                        <div>
                            <label htmlFor="number">Numer telefonu:</label>
                            <Field type="text" id="number" number="number" />
                            <ErrorMessage number="number" component="div" />
                        </div>
                        <div>
                            <label htmlFor="adress">Adres:</label>
                            <Field type="text" id="adress" adress="adress" />
                            <ErrorMessage adress="adress" component="div" />
                        </div>
                        <div>
                            <label htmlFor="code">Kod pocztowy:</label>
                            <Field type="text" id="code" code="code" />
                            <ErrorMessage code="code" component="div" />
                        </div>
                        <div>
                            <label htmlFor="city">Miasto:</label>
                            <Field type="text" id="city" city="city" />
                            <ErrorMessage city="city" component="div" />
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Zamów
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FormS2;