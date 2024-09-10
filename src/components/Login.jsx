import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      if (isRegistering) {
        const success = await register(values.email, values.password);
        if (success) {
          navigate("/");
        } else {
          setStatus("Registration failed. Please try again.");
        }
      } else {
        const success = await login(values.email, values.password);
        if (success) {
          navigate("/");
        } else {
          setStatus("Login failed. Please check your credentials.");
        }
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="login-register-container fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="login-register-form bg-slate-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {isRegistering ? "Register" : "Sign in"}
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="form-group mb-4">
                <label
                  htmlFor="email"
                  className="form-label block text-sm font-medium text-gray-500"
                >
                  Email address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="form-control mt-1 p-2 block w-full rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message text-red-500 text-sm mt-1"
                />
              </div>

              <div className="form-group mb-4">
                <label
                  htmlFor="password"
                  className="form-label block text-sm font-medium text-gray-500"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  className="form-control mt-1 p-2 block w-full rounded-md"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message text-red-500 text-sm mt-1"
                />
              </div>

              {status && (
                <div className="error-message text-red-500 text-sm mb-4">
                  {status}
                </div>
              )}

              <div className="form-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting
                    ? isRegistering
                      ? "Registering..."
                      : "Signing in..."
                    : isRegistering
                    ? "Register"
                    : "Sign in"}
                </button>
              </div>

              {!isRegistering && (
                <p className="text-center mt-4">
                  New user?{" "}
                  <button type="button" onClick={handleToggleForm}>
                    Create an account
                  </button>
                </p>
              )}

              {isRegistering && (
                <p className="text-center mt-4">
                  Already have an account?{" "}
                  <button type="button" onClick={handleToggleForm}>
                    Sign in
                  </button>
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginRegister;
