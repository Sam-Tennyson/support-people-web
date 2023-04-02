import React from 'react'
import ReactModal from '../ReactModal'
import { LABELS } from '../../../Shared/Constants'

const ConfirmationModal = ({openModal, closeModal, title}) => {
  return (
    <>
        <ReactModal
            isOpen={openModal}
            handleToggle={closeModal}
        >
            <div className="modal-dialog modal-simple modal-enable-otp modal-dialog-centered">
                <div className="modal-content p-5 p-md-5">
                  <div className="modal-heading">
                    <div className=" mb-4 text-center">
                        <h2 className="mb-2">{LABELS.CONFIRMATION}</h2>
                    <hr />
                    </div>
                  </div>
                  <div className="modal-body">
                    <h5 className='text-center mb-2'>{title}</h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <button className='btn btn-secondary mx-2'>{LABELS?.CANCEL}</button>
                      <button className='btn btn-danger mx-2'>{LABELS?.DELETE}</button>
                    </div>
                  </div>
                </div>
            </div>
        </ReactModal>
    </>
  )
}

export default ConfirmationModal