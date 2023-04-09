import { Icon, IconButton, Pagination } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomMUITable from "../../../Components/Atoms/CustomMUITable";
import { deleteCauseData, editCauseData, getCauseAllData } from "../../../Redux/Actions/CauseData";
import { CONFIRM_MESSAGE, ERROR_MESSAGE, LABELS, STRINGS } from "../../../Shared/Constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MenuIcon from '@mui/icons-material/Menu';
import "./style.scss";
import ReactModal from "../../../Components/Atoms/ReactModal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextField from "../../../Components/Atoms/TextField";
import ConfirmationModal from "../../../Components/Atoms/ConfirmationModal";
import * as Yup from 'yup'

import { errorSnackbar, successSnackbar } from '../../../Shared/Utilities'
import { withSnackbar } from "notistack";

const validationSchema = Yup.object({
  title: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
  description: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
});

const MyCause = ({enqueueSnackbar}) => {

  const limitRef = useRef(10);
  const skipRef = useRef(0);
  const totalPageRef = useRef();
  const dispatch = useDispatch();

  const causeDataRed = useSelector((state) => state.causeData.cause_data);
  const causeDataCountRed = useSelector((state) => state.causeData.cause_data_count);

  const [totalPageCount, setTotalPageCount] = useState("");
  const [causeData, setCauseData] = useState({ data: [], count: "" });
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentData, setCurrentData] = useState("")

  const openEdit = (data) => {
    setCurrentData(data)
    setEditModal(true)
  }

  const handleEditClose = () => {
    setEditModal(false)
    setCurrentData("")
  }

  const openDelete = (data) => {
    setCurrentData(data)
    setDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setCurrentData("")
    setDeleteModal(false)
  }

  useEffect(() => {
    if (causeDataCountRed && causeDataCountRed !== totalPageRef.current) {
      totalPageRef.current = causeDataCountRed;
      let pageCount = Math.ceil(causeDataCountRed / 10);
      let pageNumber = pageCount > 0 ? pageCount : "1";
      setTotalPageCount(pageNumber);
      return;
    }
  }, [causeDataCountRed]);

  const fetchCauseData = async () => {
    dispatch(
      getCauseAllData({
        limit: limitRef.current,
        skip: skipRef.current,
        success: (data) => {
          setCauseData({
            data: data?.data,
            count: data?.totalCount,
          });
        },
        fail: (errMsg) => {
          let err = errMsg ? errMsg : "Something went wrong";
          enqueueSnackbar(err, errorSnackbar);
        },
      })
    );
  };

  const handlePageClick = (e) => {
    console.log(e);
  };

  const columns = [
    {
      id: "title",
      label: "Title",
      align: "center",
    },
    {
      id: "description",
      label: "Description",

      align: "center",
    },
    {
      id: "action",
      label: "Action",
      align: "left",
      format: (value, row) => {
        return (
          <div className="d-flex align items center">
            <button className="btn btn-success btn-sm iconBackground mx-3">
              <EditIcon /> Edit
            </button>
            <button className="btn btn-danger btn-sm iconBackground">
              <DeleteForeverIcon />
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const handleEditSubmit = (data) => {
    console.log(data);
    dispatch(editCauseData({
      id: currentData?._id,
      formData: data,
      success: (msg) => { 
        enqueueSnackbar(msg, successSnackbar);
        fetchCauseData()
        handleEditClose();
      },
      fail: (errMsg) => {
        let err = errMsg ? errMsg : ERROR_MESSAGE.SOMETHING_WENT_WRONG
        enqueueSnackbar(err, successSnackbar);
        handleEditClose();
      }
    }))
  }

  const handleDeleteSubmit = (data) => {
    console.log(data);
    dispatch(deleteCauseData({
      id: currentData?._id,
      success: (msg) => {
        enqueueSnackbar(msg, successSnackbar)
        fetchCauseData()
        handleCloseDeleteModal()
      },
      fail: (errMsg) => {
        let err = errMsg ? errMsg : ERROR_MESSAGE.SOMETHING_WENT_WRONG
        enqueueSnackbar(err, successSnackbar);
        handleCloseDeleteModal()
      }
    }))
  }

  useEffect(() => {
    fetchCauseData();
  }, []);

  return (
    <>
      <ReactModal 
        isOpen={editModal}
        handleToggle={handleEditClose}
      >
         {/* <div className="modal-dialog modal-simple modal-enable-otp modal-dialog-centered"> */}
            <div className="modal-content p-5 p-md-5">
              <div className="modal-body">
                <div className=" mb-4 text-center">
                    <h2 className="mb-2">{LABELS.EDIT_CAUSE}</h2>
                    <hr />
                </div>
                <div className=''>
                    <Formik
                      onSubmit={handleEditSubmit}
                      initialValues={{ 
                        title: currentData.title, 
                        description: currentData?.description }}
                      validationSchema={validationSchema}
                    >
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form>


                                <div className="col-12 mb-2">
                                    <label className="form-label"><h5>{STRINGS.TITLE}</h5></label>
                                    <div className="form-group">
                                        <TextField
                                            name={"title"}
                                            placeholder={"Enter title"}
                                            className={`form-control`}
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div className="col-12 mb-2">
                                    <label className="form-label"><h5>{STRINGS.DESCRPTION}</h5></label>
                                    <Field
                                      as="textarea" 
                                      name={"description"}
                                      placeholder={"Enter description"}
                                      className={`form-control`}
                                      type="text"
                                      rows="5"  
                                    />
                                    <div className='error'>
                                      <ErrorMessage name={"description"} />
                                  </div>
                                </div>

                                <div className="col-12 my-3 ">
                                    <button type="submit" className="btn btn-secondary text-capitalize">
                                        {LABELS.UPDATE}
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
              </div>
            </div>
        {/* </div> */}
      </ReactModal>

      <ConfirmationModal 
        openModal={deleteModal}
        closeModal={handleCloseDeleteModal}
        onSubmit={handleDeleteSubmit}
        title={CONFIRM_MESSAGE?.CAUSE_DELETE}
      />
      {totalPageCount ? (
        <>
          <div className=" cause_data_list">
            {/* <CauseList data={causeDataRed} /> */}
            {causeDataRed
              ? causeDataRed.map((item, ind) => {
                  return (
                    <div className="card cause_box m-3 p-5 " key={ind}>
                      <h3 className="mb-0 d-flex justify-content-between align-items-center cause_title">
                        {item.title}
                        <div className="d-flex justify-content-between align-items-center">
                        <IconButton
                            className="mx-2 mb-0"
                            size="large"
                            onClick={()=> openEdit(item)}
                            color="inherit"
                        >
                            <EditIcon color="primary"/>
                        </IconButton>
                        <IconButton
                            size="large"
                            className="mx-2 mb-0"
                            onClick={()=>openDelete(item)}
                        >
                            <DeleteForeverIcon color="error"/>
                        </IconButton>
                        </div>
                      </h3>
                      {/* <hr className="m-0"/> */}
                      <div className="cause_description ">
                        {item?.description}
                      </div>
                    </div>
                  );
                })
              : null}

            {/* <CustomMUITable 
                    rows={causeData?.data}  
                    page={0}
                    count={causeData.count}
                    columns={columns} 
                    perPage={10}
                    handleChangePage={(pageEvent, p) => {
 
                    //   fetchTransactionData();
                    }} 
                /> */}
          </div>
          <Pagination 
            count={totalPageCount} 
            onChange={(e, page)=>{
              console.log(e, page)
              // let skipedData = (Number(e.target.innerText)-1)*10
              skipRef.current= (page-1)*10
              fetchCauseData()
            }}
          />
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          {STRINGS.NO_DATA_FOUND}
        </div>
      )}
    </>
  );
};

export default withSnackbar(MyCause);
