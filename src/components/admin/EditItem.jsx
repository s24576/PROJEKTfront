import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Pole jest wymagane'),
    category: Yup.string().required('Pole jest wymagane'),
    photo: Yup.string().url('Podaj poprawny link URL').required('Pole jest wymagane'),
    price: Yup.number()
      .moreThan(0, 'Cena musi być większa niż 0')
      .required('Pole jest wymagane')
      .transform((givenValue, originalObject) => {
        const s = givenValue.toString();
        const decimal = s.split('.')[1];
        if (decimal && decimal.length > 2) {
          throw new Yup.ValidationError('Maksymalnie dwie cyfry po przecinku', givenValue, originalObject.path);
        }
        return parseFloat(givenValue);
      }),
    description: Yup.string().required('Pole jest wymagane'),
    quantity: Yup.number()
      .moreThan(0, 'Ilość musi być większa niż 0')
      .transform((givenValue, originalObject) => {
        const s = givenValue.toString();
        const decimal = s.split('.')[1];
        if (decimal) {
          throw new Yup.ValidationError('Ilość musi być całkowita', givenValue, originalObject.path);
        }
        return givenValue;
      })
      .required('Pole jest wymagane'),
  });

function EditItem({ id, onResetEdit }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleResetEdit = () => {
    onResetEdit();
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/item/byId", { params: { itemId: id } });
        setItem(response.data.item);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleEdit = async (values, { setSubmitting }) => {
    try {
       const response = await axios.put(`http://localhost:3001/api/item/edit/`, {
        id: id,
        item: values
      });
      console.log('Item edited successfully:', response.data);

      onResetEdit();
    } catch (error) {
      console.error('Error editing item:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md">
      <Formik
        enableReinitialize
        initialValues={{
          name: item.name || '',
          category: item.category || '',
          photo: item.photo || '',
          price: item.price || '',
          description: item.description || '',
          quantity: item.quantity || '',
          shipping1: item.shipping1 || false,
          shipping2: item.shipping2 || true
        }}
        validationSchema={validationSchema}
        onSubmit={handleEdit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <h2 className="text-2xl font-bold">Edytuj {item.name}</h2>

            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold mb-1">Nazwa:</label>
              <Field type="text" id="name" name="name" className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
  
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-semibold mb-1">Kategoria:</label>
              <Field type="text" id="category" name="category" className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>
  
            <div className="flex flex-col">
              <label htmlFor="photo" className="text-sm font-semibold mb-1">Link do zdjęcia:</label>
              <Field type="url" id="photo" name="photo" className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="photo" component="div" className="text-red-500 text-sm mt-1" />
            </div>
  
            <div className="flex flex-col">
              <label htmlFor="price" className="text-sm font-semibold mb-1">Cena:</label>
              <Field type="number" id="price" name="price" className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
            </div>
  
            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-semibold mb-1">Opis:</label>
              <Field as="textarea" id="description" name="description" className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
  
            <div className="flex flex-col">
              <label htmlFor="quantity" className="text-sm font-semibold mb-1">Ilość:</label>
              <Field type="number" id="quantity" name="quantity" className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
            </div>
  
            <div className="flex items-center">
                <label htmlFor="shipping1" className="text-sm font-semibold mr-2">Dostawa paczkomat:</label>
                <Field type="checkbox" id="shipping1" name="shipping1" className="form-checkbox h-5 w-5 text-blue-500" checked={item.shipping1} />
            </div>

            <div className="flex items-center">
                <label htmlFor="shipping2" className="text-sm font-semibold mr-2">Dostawa kurier:</label>
                <Field
                    type="checkbox"
                    id="shipping2"
                    name="shipping2"
                    checked={item.shipping2}
                    disabled={true}
                    className="form-checkbox h-5 w-5 text-blue-500"
                />
            </div>

            <div className="flex items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Zapisz
              </button>
              <button
                type="button"
                onClick={handleResetEdit}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
              >
                Anuluj
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditItem;
