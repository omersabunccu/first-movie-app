import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "../styles/Login.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { forgetPassword, login, signUpProvider } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const handleSubmit = async (values) => {
    const { email, password } = values;
    const error = await login(email, password);
    if (error) navigate("/login");
    else navigate("/");
  };
  const providerHandler = () => {
    signUpProvider();
    navigate("/");
  };

  const forgetPasswordHandler = async (email)=>{
    await forgetPassword(email)
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email Required"),
    password: Yup.string().min(5, "Minimum 5 characters"),
  });

  return (
    <div className={styles.Login}>
      <div className={styles.LoginForm}>
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
              <div className="mb-3">
                <lable
                  className="form-label text-light d-block mb-2"
                  htmlFor="email"
                >
                  Email
                </lable>
                <Field
                  id="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Enter Your Email..."
                  name="email"
                  className="form-control"
                />
                <small className="text-danger">
                  <ErrorMessage name="email" />
                </small>
              </div>

              <div className="mb-3">
                <lable
                  className="form-label text-light d-block mb-2"
                  htmlFor="password"
                >
                  Password
                </lable>
                <Field
                  id="password"
                  type="password"
                  autoComplete="off"
                  placeholder="Enter Your Password..."
                  name="password"
                  className="form-control"
                />
                <small className="text-danger">
                  <ErrorMessage name="password" />
                </small>
              </div>

              <div
                className="text-center text-warning mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => {forgetPasswordHandler(values.email)}}
              >
                Forgot Password?
              </div>
              <div className="d-grid">
                <button className="btn btn-primary mt-2">Login</button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="d-grid">
          <button className="btn btn-primary mt-2" onClick={providerHandler}>
            Continue With Your Google Account
          </button>
        </div>
        <p className="text-center text-light mt-2">
          Don't Have an Account 
          <span
            className="text-warning"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            {" "}
            Sign Up{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
