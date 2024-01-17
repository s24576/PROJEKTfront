import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { ItemsContext } from "../context/ItemsContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Pole jest wymagane"),
  surname: Yup.string().required("Pole jest wymagane"),
  email: Yup.string().required("Pole jest wymagane"),
  number: Yup.string().required("Pole jest wymagane"),
  address: Yup.string().required("Pole jest wymagane"),
  postalcode: Yup.string().required("Pole jest wymagane"),
  city: Yup.string().required("Pole jest wymagane"),
});

function FormS2() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(ItemsContext);
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
        },
      });

      const address = "/order/" + response.data.id;
      navigate(address);
      setCart(null);
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
        initialValues={{
          name: "",
          surname: "",
          email: "",
          address: "",
          postalcode: "",
          city: "",
          number: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleAdd}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Imię:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-4">
              <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                Nazwisko:
              </label>
              <Field
                type="text"
                id="surname"
                name="surname"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="surname" component="div" className="text-red-500 text-xs" />
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
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Adres:
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-4">
              <label htmlFor="postalcode" className="block text-sm font-medium text-gray-700">
                Kod pocztowy:
              </label>
              <Field
                type="text"
                id="postalcode"
                name="postalcode"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage
                name="postalcode"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Miasto:
              </label>
              <Field
                type="text"
                id="city"
                name="city"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="city" component="div" className="text-red-500 text-xs" />
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
        <p className="mb-4">Potwierdź dane do wysyłki</p>
        {formData && (
          <div className="mb-4">
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
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Potwierdź
          </button>
          <button onClick={handleReject} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Odrzuć
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default FormS2;
