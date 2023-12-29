import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Pole jest wymagane'),
    photo: Yup.string().url('Podaj poprawny link URL').required('Pole jest wymagane'),
    price: Yup.number().moreThan(0, 'Cena musi być większa niż 0').required('Pole jest wymagane').transform((givenValue, originalObject) => {
        const s = givenValue.toString();
        const decimal = s.split(".")[1];
        if (decimal && decimal.length > 2) {
            throw new Yup.ValidationError('Maksymalnie dwie cyfry po przecinku', givenValue, originalObject.path);
        }
        return parseFloat(givenValue);
    })
    ,
    description: Yup.string().required('Pole jest wymagane'),
    quantity: Yup.number().moreThan(0, 'Ilość musi być większa niż 0').transform((givenValue, originalObject)=>{
        const s = givenValue.toString();
        const decimal = s.split(".")[1];
        if(decimal){
            throw new Yup.ValidationError('Ilość musi być całkowita', givenValue, originalObject.path);
        }
        return givenValue
    })
    .required('Pole jest wymagane'),
    shipping1: Yup.boolean().required('Pole jest wymagane'),
    shipping2: Yup.boolean().required('Pole jest wymagane'),
});

function AddItem(){
     const handleAdd = async (values, {setSubmitting})=>{
        try {
            const response = await axios.post('http://localhost:3001/api/admin/add/item', values);
        }
        catch(error){
            console.error("Error:", error);
        }
        finally{
            setSubmitting(false);
        }
    }
    return(
        <div>
            <Formik
                initialValues={{ name: '', photo: '', price: '', description: '', quantity: '',shipping1: false, shipping2: false, }}
                validationSchema={validationSchema}
                onSubmit={handleAdd}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Nazwa:</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <div>
                            <label htmlFor="photo">Link do zdjęcia:</label>
                            <Field type="url" id="photo" name="photo" />
                            <ErrorMessage name="photo" component="div" />
                        </div>
                        <div>
                            <label htmlFor="price">Cena:</label>
                            <Field type="number" id="price" name="price" />
                            <ErrorMessage name="price" component="div" />
                        </div>
                        <div>
                            <label htmlFor="description">Opis:</label>
                            <Field type="textarea" id="description" name="description" />
                            <ErrorMessage name="description" component="div" />
                        </div>
                        <div>
                            <label htmlFor="quantity">Ilość:</label>
                            <Field type="number" id="quantity" name="quantity" />
                            <ErrorMessage name="quantity" component="div" />
                        </div>
                        <div>
                            <label htmlFor="shipping1">Dostawa paczkomat:</label>
                            <Field type="checkbox" id="shipping1" name="shipping1" />
                            <ErrorMessage name="shipping1" component="div" />
                        </div>
                        <div>
                            <label htmlFor="shipping2">Dostawa kurier:</label>
                            <Field type="checkbox" id="shipping2" name="shipping2" />
                            <ErrorMessage name="shipping2" component="div" />
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Dodaj
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddItem;