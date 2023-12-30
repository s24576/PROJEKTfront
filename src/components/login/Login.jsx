import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Field is required"),
  password: Yup.string().required("Field is required"),
});

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        values
      );
      console.log("Login successful:", response.data);
      if (response.data.message === "Login successful") {
        setUser(response.data.user);
        navigate("/main");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validation}
        onSubmit={handleLogin}
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
              <button type="submit" disabled={isSubmitting}>
                Zaloguj
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
