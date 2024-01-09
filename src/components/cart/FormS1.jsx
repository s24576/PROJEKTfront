import React, { useState, useContext} from "react";
import Modal from 'react-modal';
import axios from "axios";
import { ItemsContext } from "../context/ItemsContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    names: Yup.string().required('Pole jest wymagane'),
    email: Yup.string().required('Pole jest wymagane'),
    number: Yup.string().required('Pole jest wymagane'),
    code: Yup.string().required('Pole jest wymagane'),
});

function FormS1() {
    const navigate = useNavigate();
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
            const response = await axios.post('http://localhost:3001/api/order/add',
            {
                type: "shipping1",
                cart: cart,
                shipping: {
                    names: formData.names,
                    email: formData.email,
                    number: formData.number,
                    code: formData.code,
                }
            });
            
            const address = '/order/'+response.data.id;
            navigate(address);
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
                initialValues={{ names: '', email: '', number: '', code: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleAdd(values)}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="names">Imię i nazwisko:</label>
                            <Field type="text" id="names" name="names" />
                            <ErrorMessage name="names" component="div" />
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
                            <label htmlFor="code">Numer paczkomatu:</label>
                            <Field type="text" id="code" name="code" />
                            <ErrorMessage name="code" component="div" />
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
                        <p>Imię i nazwisko: {formData.names}</p>
                        <p>Adres email: {formData.email}</p>
                        <p>Numer telefonu: {formData.number}</p>
                        <p>Numer paczkomatu: {formData.code}</p>
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

export default FormS1;
