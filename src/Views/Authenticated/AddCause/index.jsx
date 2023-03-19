import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import TextField from '../../../Components/Atoms/TextField'
import { ERROR_MESSAGE, PLACEHOLDER, RESPONSE, STRINGS } from '../../../Shared/Constants'
import * as yup from "yup"
import { addCauseData } from '../../../Redux/Actions/CauseData'
import { errorSnackbar, successSnackbar } from '../../../Shared/Utilities'
import { withSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { ROUTE_CONSTANTS } from '../../../Shared/Routes'

const validationSchema = yup.object({
  title: yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
  description: yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
})

const AddCause = ({enqueueSnackbar}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    // console.log(data)

    dispatch(addCauseData({
      formData: data,
      success: () => {
        let msg = RESPONSE.SUCCESS_ADDED_CAUSE;
        enqueueSnackbar(msg, successSnackbar);
        navigate({pathname: ROUTE_CONSTANTS.DASHBOARD})
      
      },
      fail: (errMsg) => {
        let err = errMsg ? errMsg : ERROR_MESSAGE.SOMETHING_WENT_WRONG;
        enqueueSnackbar(err, errorSnackbar);
      },
    }))
  }
  return (
    <>
        <div className="containter">
        <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{ title: "", description: "" }}
          >
            {({ values, errors }) => (
              <Form>
                <div className="row">
                  <div className="col-12 my-2 border-radius-form">
                    <label className="form-label">{STRINGS.TITLE} </label>
                    <TextField
                      name={"title"}
                      type={"text"}
                      placeholder={PLACEHOLDER.TITLE}
                    />
                  </div>
                  <div className="col-12 my-2 border-radius-form">
                    <label className="form-label">{STRINGS.DESCRPTION} </label>
                    <TextField
                      name={"description"}
                      type={"textarea"}
                      row="2"
                      placeholder={PLACEHOLDER.DESCRPTION}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex login-button justify-content-between align-items-center">
                    <button className="btn btn-secondary">
                      {STRINGS.ADD}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
    </>
  )
}

export default withSnackbar(AddCause)