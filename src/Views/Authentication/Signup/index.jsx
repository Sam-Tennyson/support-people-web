import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../../Components/Atoms/TextField";
import { ERROR_MESSAGE, PLACEHOLDER, STRINGS } from "../../../Shared/Constants";
import * as Yup from "yup";
import "./style.scss";
import { signup } from "../../../Redux/Actions/Auth";
import { withSnackbar } from "notistack";
import { errorSnackbar, successSnackbar } from "../../../Shared/Utilities";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string().required(ERROR_MESSAGE.FIELD_REQUIRED),
  password: Yup.string().required(ERROR_MESSAGE.FIELD_REQUIRED),
  name: Yup.string().required(ERROR_MESSAGE.FIELD_REQUIRED),
  phone: Yup.string().required(ERROR_MESSAGE.FIELD_REQUIRED),
});

const Signup = ({ enqueueSnackbar }) => {
  const navigate = useNavigate();
  const handleSubmit = async (val) => {
    console.log(val);
    // debugger;
    let data = {
      email: val.email,
      pass: val.password,
      name: val.name,
      phone: val.phone,
    };

    try {
      const response = await axios.post(
        "http://localhost:7000/auth/signup",
        data
      );
      let msg = "Successfully Registered";
      enqueueSnackbar(msg, successSnackbar);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.log(error);
      let err = "Something went wrong";
      enqueueSnackbar(err, errorSnackbar);
    }

    // dispatch(signup({
    //     formData: formData,
    //     success: () =>{},
    //     fail: (errMsg) => {
    // let err = errMsg ? errMsg : "Something went wrong"
    // enqueueSnackbar(err, errorSnackbar)
    //     }
    // }))
  };
  return (
    <>
      <div className="front-screen d-flex align-items-center min-vh-100">
        <div className="login_screen make-res p-5 ">
          <h2 className="text-center">{STRINGS.SIGNUP}</h2>
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{ name: "", phone: "", email: "", password: "" }}
          >
            {({ values, errors }) => (
              <Form>
                <div className="row">
                  <div className="col-12 my-2">
                    <label className="form-label"> {STRINGS.NAME} </label>
                    <TextField
                      name={"name"}
                      type={"name"}
                      placeholder={PLACEHOLDER.NAME}
                    />
                  </div>
                  <div className="col-12 my-2">
                    <label className="form-label"> {STRINGS.EMAIL} </label>
                    <TextField
                      name={"email"}
                      type={"text"}
                      placeholder={PLACEHOLDER.EMAIL}
                    />
                  </div>
                  <div className="col-12 my-2">
                    <label className="form-label"> {STRINGS.PHONE} </label>
                    <TextField
                      name={"phone"}
                      type={"phone"}
                      placeholder={PLACEHOLDER.PHONE}
                    />
                  </div>
                  <div className="col-12 my-2">
                    <label className="form-label"> {STRINGS.PASSWORD} </label>
                    <TextField
                      name={"password"}
                      type={"password"}
                      placeholder={PLACEHOLDER.PASSWORD}
                    />
                  </div>
                  <div className="col-12 my-2 ">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label mx-2">
                      {" "}
                      {STRINGS.SHOW_PASSWORD}{" "}
                    </label>
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-between align-item-center login-button">
                    <button className="btn btn-secondary">
                      {STRINGS.SIGNUP}{" "}
                    </button>
                    <p>
                      <a onClick={() => navigate("/login")}>Go to Login</a>
                    </p>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default withSnackbar(Signup);
