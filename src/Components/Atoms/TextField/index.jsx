import { ErrorMessage, useField } from 'formik'
import React from 'react'
import "./style.scss"
const TextField = (props) => {
  const [field, meta, onChange] = useField(props)
  return (
    <>
        <input 
            className={"form-controls border-radius-form"}
            {...field}

            {...props}
            autoComplete="off" 
        />
        <div className='error'>
            <ErrorMessage name={field.name} />
        </div>
    </>
  )
}

export default TextField