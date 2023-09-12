import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "../styles/Login.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { register, signUpProvider } from "../firebase";

const Register = () => {

  const navigate = useNavigate()
  const initialValues = { name:'', email: "", password: "" };

  const handleSubmit = async(values) => {
    const {email, name, password} = values
    const error = await register(email, password, name)
    if(error) navigate('/register')
    else navigate('/')
  };

  const providerHandler = () => {
    signUpProvider();
    navigate('/')
  }
  const validationSchema = Yup.object().shape({

    email: Yup.string().email("Invalid Email").required("Email Required"),
    password: Yup.string().min(5, "Minimum 5 characters"),
    name:Yup.string().min(3, 'minimum 3 characters')
  });



  return (
    <div className={styles.Login}>
      <div className={styles.LoginForm}>
        <h1>Register</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="mb-3">
              <lable
                className="form-label text-light d-block mb-2"
                htmlFor="name"
              >
                Name
              </lable>
              <Field
                id="name"
                type="text"
                autoComplete="off"
                placeholder="Enter name"
                name="name"
                className="form-control"
              />
              <small className="text-danger">
                <ErrorMessage name="name" />
              </small>
            </div>

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
                placeholder="Enter Email"
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
                placeholder="Enter password"
                name="password"
                className="form-control"
              />
              <small className="text-danger">
                <ErrorMessage name="password" />
              </small>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary mt-2">Sign up</button>
            </div>
          </Form>
        </Formik>

        <div className="d-grid">
          <button className="btn btn-primary mt-2" onClick={providerHandler}>
            Continue with google account
          </button>
        </div>
        <p className="text-center text-light mt-2">
          Have an account 
          <span className="text-warning" style={{ cursor: "pointer" }} onClick={()=>navigate('/login')}> Login</span>
        </p>
      </div>
    </div>
  )
}

export default Register