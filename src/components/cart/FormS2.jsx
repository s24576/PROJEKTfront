import React, { useState, useContext} from "react";
import Modal from 'react-modal';
import axios from "axios";
import { ItemsContext } from "../context/ItemsContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Pole jest wymagane'),
    surname: Yup.string().required('Pole jest wymagane'),
    email: Yup.string().required('Pole jest wymagane'),
    number: Yup.string().required('Pole jest wymagane'),
    address: Yup.string().required('Pole jest wymagane'),
    postalcode: Yup.string().required('Pole jest wymagane'),
    city: Yup.string().required('Pole jest wymagane'),
});

function FormS2() {
    const {cart, setCart}=useContext(ItemsContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleAdd = async (values) => {
        setFormData(values);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleConfirm = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/add/order', {
                type: "shipping2",
                cart: cart,
                shipping: {
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    number: formData.number,
                    address: formData.address,
                    postalcode: formData.postalcode,
                    city: formData.city,
                }
            });
            setCart(null);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            closeModal();
        }
    }
    

    const handleReject = () => {
        closeModal();
    }


    return (
        <div>
            <Formik
                initialValues={{ name: '', surname: '', email: '', address: '', postalcode: '', city: '', number: '' }}
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
                            <Field type="text" id="surname" name="surname" />
                            <ErrorMessage name="surname" component="div" />
                        </div>
                        <div>
                            <label htmlFor="email">Adres email:</label>
                            <Field type="text" id="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <label htmlFor="number">Numer telefonu:</label>
                            <Field type="text" id="number" name="number" />
                            <ErrorMessage name="number" component="div" />
                        </div>
                        <div>
                            <label htmlFor="address">Adres:</label>
                            <Field type="text" id="address" name="address" />
                            <ErrorMessage name="address" component="div" />
                        </div>
                        <div>
                            <label htmlFor="postalcode">Kod pocztowy:</label>
                            <Field type="text" id="postalcode" name="postalcode" />
                            <ErrorMessage name="postalcode" component="div" />
                        </div>
                        <div>
                            <label htmlFor="city">Miasto:</label>
                            <Field type="text" id="city" name="city" />
                            <ErrorMessage name="city" component="div" />
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Zamów
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirmation Modal"
            >
                <p>Potwierdź dane do wysyłki</p>
                {formData && (
                    <div>
                        <p>Imię: {formData.name}</p>
                        <p>Nazwisko: {formData.surname}</p>
                        <p>Adres email: {formData.email}</p>
                        <p>Numer telefonu: {formData.number}</p>
                        <p>Adres: {formData.address}</p>
                        <p>Kod pocztowy: {formData.postalcode}</p>
                        <p>Miasto: {formData.city}</p>
                    </div>
                )}
                <div>
                    <button onClick={handleConfirm}>Potwierdź</button>
                    <button onClick={handleReject}>Odrzuć</button>
                </div>
            </Modal>
        </div>
    )
}

export default FormS2;
