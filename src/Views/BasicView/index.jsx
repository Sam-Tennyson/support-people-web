import { Pagination } from '@mui/material';
import { withSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCauseAllData, setCauseAllData } from '../../Redux/Actions/CauseData';
import { errorSnackbar } from '../../Shared/Utilities';
import "./style.scss"

const CauseList = ({data}) =>   {
  
  if (data) {

    return data.map((item, ind) => (
      <div className='cause_box my-2 p-3' key={ind}>
        <div className='cause_title'>
          {item.title}
        </div>
        <div className="cause_description">
          {item?.description}
        </div>
      </div>
  ))}
}
const BasicView = ({enqueueSnackbar}) => {
  
  const limitRef = useRef(10);
  const skipRef = useRef(0);
  const totalPageRef = useRef()
  const dispatch = useDispatch();
  const causeDataRed = useSelector((state) => state.causeData.cause_data)
  const causeDataCountRed = useSelector((state) => state.causeData.cause_data_count)

  const [totalPageCount , setTotalPageCount] = useState("")

  useEffect(() => {

    if (causeDataCountRed && causeDataCountRed !== totalPageRef.current) {
      totalPageRef.current = causeDataCountRed
      let pageCount = Math.floor(causeDataCountRed/10)
      setTotalPageCount(pageCount)
      return;
    }

  }, [causeDataCountRed])


  const fetchCauseData = async () => {
    dispatch(getCauseAllData({ 
      limit:limitRef.current,
      skip: skipRef.current,
      success: () =>{},
      fail: (errMsg) => {
        let err = errMsg ? errMsg : "Something went wrong"
        enqueueSnackbar(err, errorSnackbar)
      }
    }))
  }

  const handlePageClick = (e) => {
    console.log(e)
  }

  useEffect(() => {
    fetchCauseData()
  }, [])

  console.log(causeDataRed)

  return (
    <>
      <div className="cause_data_list my-5">
          <CauseList data={causeDataRed} />
      </div>

      <Pagination count={totalPageCount} onChange={(e)=>{
        let skipedData = (Number(e.target.innerText)-1)*10
        skipRef.current=skipedData
        fetchCauseData()
      } }/>
    </>
  )
}

export default withSnackbar(BasicView)