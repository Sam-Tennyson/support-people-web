import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '../../../Components/Atoms/TextField'
import { ERROR_MESSAGE, PLACEHOLDER, STRINGS } from '../../../Shared/Constants'
import * as Yup from 'yup'
import "./style.scss"
import { useDispatch } from 'react-redux'
import { login, setUpdatedToken, setUserData } from '../../../Redux/Actions/Auth'
import { errorSnackbar, successSnackbar } from '../../../Shared/Utilities'
import { withSnackbar } from 'notistack'
import axios from 'axios'

const validationSchema = Yup.object({
    email: Yup.string().required(ERROR_MESSAGE.FIELD_REQUIRED),
    password: Yup.string().required(ERROR_MESSAGE.FIELD_REQUIRED),
})

const Login = ({enqueueSnackbar}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (val) => {
        console.log(val)

        let  formData = {
            email: val.email,
            pass: val.password
        }
        try {
            const {data, status} = await axios.post(
              "http://localhost:7000/auth/login",
              formData
            );
            let msg = "Successfully Registered";
            enqueueSnackbar(msg, successSnackbar);
            // console.log(data)
            dispatch(setUserData(data?.data))
            dispatch(setUpdatedToken(data?.token))
            // console.log(response.data);
          } catch (error) {
            console.error(error);
            let err = "Something went wrong";
            enqueueSnackbar(err, errorSnackbar);
          }

        // dispatch(login({
        //     formData: formData,
        //     success: () =>{},
        //     fail: (errMsg) => {
        //       let err = errMsg ? errMsg : "Something went wrong"
        //       enqueueSnackbar(err, errorSnackbar)
        //     }
        // }))
    }
  return (
    <>
    <div className='front-screen d-flex align-items-center min-vh-100'>
        <div className='login_screen make-res p-5 '>
        <h2 className='text-center'>{STRINGS.LOGIN}</h2>
        <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{ email: "", password: ""}}
        > 
        {({values, errors}) => (
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
                            type={"password"}
                            placeholder={PLACEHOLDER.PASSWORD}
                        />

                    </div>
                    <div className="col-12 my-2 ">
                        <input 
                            className="form-check-input"
                            type="checkbox"
                        />
                        <label className="form-check-label mx-2"> {STRINGS.SHOW_PASSWORD} </label>
                    </div>
                    <div className="col-12 my-2 d-flex login-button justify-content-between align-items-center">
                        <button className="btn btn-secondary">{STRINGS.LOGIN}</button>
                        <p> {STRINGS.DIDNT_REGISTER} <a  onClick={() => navigate("/signup")}>{STRINGS.PLEASE_SIGN_IN}</a></p>
                    </div>
                </div>
            </Form>
            )}
        </Formik> 
        </div>
    </div>
    </>
  )
}

export default withSnackbar(Login)