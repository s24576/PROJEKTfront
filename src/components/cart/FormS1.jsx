import React, {} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Pole jest wymagane'),
    email: Yup.string().required('Pole jest wymagane'),
    number: Yup.string().required('Pole jest wymagane'),
    code: Yup.string().required('Pole jest wymagane'),
});

function FormS1(){
    const handleAdd = async (values, {setSubmitting})=>{}
    return(
        <div>
            <Formik
                onSubmit={handleAdd}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Imię i nazwisko:</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component="div" />
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
                            <label htmlFor="code">Numer paczkomatu:</label>
                            <Field type="text" id="code" code="code" />
                            <ErrorMessage code="code" component="div" />
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

export default FormS1;