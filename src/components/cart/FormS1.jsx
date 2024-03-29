import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { ItemsContext } from "../context/ItemsContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  names: Yup.string().required("Pole jest wymagane"),
  email: Yup.string().email("Nieprawidłowy format adresu email").required("Pole jest wymagane"),
  number: Yup.string().matches(/^[0-9]{9}$/, "Nieprawidłowy format numeru telefonu").required("Pole jest wymagane"),
  code: Yup.string().matches(/^[A-Za-z]{3}\d{2}$/, "Nieprawidłowy format kodu paczkomatu").required("Pole jest wymagane"),
});

function FormS1() {
  const navigate = useNavigate();
  const { cart, setCart, setShippingAvalivable } = useContext(ItemsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleAdd = async (values) => {
    setFormData(values);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/order/add", {
        type: "shipping1",
        cart: cart,
        shipping: {
          names: formData.names,
          email: formData.email,
          number: formData.number,
          code: formData.code,
        },
      });
      setShippingAvalivable(true);
      setCart(null);

      const address = "/order/" + response.data.id;
      navigate(address);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      closeModal();
    }
  };

  const handleReject = () => {
    closeModal();
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-md shadow-md">
      <Formik
        initialValues={{ names: "", email: "", number: "", code: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleAdd(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="names" className="block text-sm font-medium text-gray-700">
                Imię i nazwisko:
              </label>
              <Field
                type="text"
                id="names"
                name="names"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="names" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adres email:
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-4">
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Numer telefonu:
              </label>
              <Field
                type="text"
                id="number"
                name="number"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="number" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Numer paczkomatu:
              </label>
              <Field
                type="text"
                id="code"
                name="code"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="code" component="div" className="text-red-500 text-xs" />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
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
        className="modal"
        overlayClassName="overlay"
      >
        <div className="bg-white p-4 rounded-md">
          <p className="mb-4 text-lg font-bold">Potwierdź dane do wysyłki</p>
          {formData && (
            <div className="mb-4">
              <p className="mb-2"><span className="font-semibold">Imię i nazwisko:</span> {formData.names}</p>
              <p className="mb-2"><span className="font-semibold">Adres email:</span> {formData.email}</p>
              <p className="mb-2"><span className="font-semibold">Numer telefonu:</span> {formData.number}</p>
              <p className="mb-2"><span className="font-semibold">Numer paczkomatu:</span> {formData.code}</p>
            </div>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleConfirm}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Potwierdź
            </button>
            <button 
              onClick={handleReject} 
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Odrzuć
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FormS1;
