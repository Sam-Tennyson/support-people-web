import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../../Components/Atoms/TextField";
import {
  ERROR_MESSAGE,
  PLACEHOLDER,
  RESPONSE,
  STRINGS,
} from "../../../Shared/Constants";
import * as Yup from "yup";
import "./style.scss";
import { useDispatch } from "react-redux";
import {
  login,
  setUpdatedToken,
  setUserData,
} from "../../../Redux/Actions/Auth";
import { errorSnackbar, successSnackbar } from "../../../Shared/Utilities";
import { withSnackbar } from "notistack";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required(ERROR_MESSAGE.FIELD_REQUIRED)
    .email(ERROR_MESSAGE.VALID_EMAIL),
  password: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
});

const Login = ({ enqueueSnackbar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (val) => {
    console.log(val);

    let formData = {
      email: val.email,
      pass: val.password,
    };

    dispatch(
      login({
        formData: formData,
        success: () => {
          let msg = RESPONSE.SUCCESS_LOGIN;
          enqueueSnackbar(msg, successSnackbar);
        },
        fail: (errMsg) => {
          let err = errMsg ? errMsg : ERROR_MESSAGE.SOMETHING_WENT_WRONG;
          enqueueSnackbar(err, errorSnackbar);
        },
      })
    );
  };
  return (
    <>
      <div className="front-screen d-flex align-items-center flex-column min-vh-100">
        <div className="login_screen make-res p-5 ">
          <div className="imageCont">
          <div className="imageFun"></div>

          </div>
          <h2 className="text-center mb-2">{STRINGS.LOGIN}</h2>
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{ email: "", password: "" }}
          >
            {({ values, errors }) => (
              <Form>
                <div className="row">
                  <div className="col-12 my-2 border-radius-form">
                    <label className="form-label">{STRINGS.EMAIL} </label>
                    <TextField
                      name={"email"}
                      type={"text"}
                      placeholder={PLACEHOLDER.EMAIL}
                    />
                  </div>
                  <div className="col-12 my-2 border-radius-form">
                    <label className="form-label">{STRINGS.PASSWORD} </label>
                    <TextField
                      name={"password"}
                      type={!showPassword ? "password": "text" }
                      placeholder={PLACEHOLDER.PASSWORD}
                    />
                  </div>
                  <div className="col-12 my-2 ">
                    <input className="form-check-input" type="checkbox" onClick={() => setShowPassword((prev) => !prev)} />
                    <label className="form-check-label mx-2">
                      {" "}
                      {STRINGS.SHOW_PASSWORD}{" "}
                    </label>
                  </div>
                  <div className="col-12 my-2  login-button justify-content-between align-items-center">
                    <button className="btn btn-secondary">
                      {STRINGS.LOGIN}
                    </button>
                    <p className="mt-3 mb-0">
                      {" "}
                      {STRINGS.DIDNT_REGISTER}{" "}
                      <a onClick={() => navigate("/signup")}>
                        {STRINGS.PLEASE_SIGN_IN}
                      </a>
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

export default withSnackbar(Login);
