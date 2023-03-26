import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../../Components/Atoms/TextField";
import { ERROR_MESSAGE, PLACEHOLDER, RESPONSE, STRINGS } from "../../../Shared/Constants";
import * as Yup from "yup";
import "./style.scss";
import { signup } from "../../../Redux/Actions/Auth";
import { withSnackbar } from "notistack";
import { errorSnackbar, successSnackbar } from "../../../Shared/Utilities";
import { useDispatch } from "react-redux";
import { ROUTE_CONSTANTS } from "../../../Shared/Routes";

const validationSchema = Yup.object({
  email: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
  password: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
  name: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
  phone: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
});

const Signup = ({ enqueueSnackbar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (val) => {
    console.log(val);
    
    let formData = {
      email: val.email,
      pass: val.password,
      name: val.name,
      phone: val.phone,
    };

    dispatch(signup({
        formData: formData,
        success: () => {
          let msg = RESPONSE.SUCCESS_REGISTER;
          enqueueSnackbar(msg, successSnackbar);
          navigate({pathname: ROUTE_CONSTANTS.LOGIN})
        },
        fail: (errMsg) => {
          let err = errMsg ? errMsg : ERROR_MESSAGE.SOMETHING_WENT_WRONG;
          enqueueSnackbar(err, errorSnackbar);
        },
    }))
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
                      type={!showPassword ? "password": "text" }
                      placeholder={PLACEHOLDER.PASSWORD}
                    />
                  </div>
                  <div className="col-12 my-2 ">
                    <input className="form-check-input" type="checkbox"  onClick={() => setShowPassword((prev) => !prev)} />
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
