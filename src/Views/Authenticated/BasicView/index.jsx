import { Pagination } from '@mui/material';
import { withSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCauseAllData, setCauseAllData } from '../../../Redux/Actions/CauseData';
import { STRINGS, STRING_NUMBER } from '../../../Shared/Constants';
import { errorSnackbar } from '../../../Shared/Utilities';
import "./style.scss"

const CauseList = ({data}) =>   {
  if (data) {

    return data.map((item, ind) => (
      <div className=' cause_box m-3 p-3' key={ind}>
        <h3 className='cause_title px-3'>
          {item.title}
        </h3>
        <div className=" cause_description px-3">
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
      let pageCount = Math.ceil(causeDataCountRed/10)
      let pageNumber = pageCount > 0 ? pageCount  : "1"
      setTotalPageCount(pageNumber)
      return;
    }

  }, [causeDataCountRed])


  const fetchCauseData = async () => {
    dispatch(getCauseAllData({ 
      all: STRING_NUMBER.ONE,
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
      {totalPageCount ? (
        <>
        <div className=" cause_data_list">
            <CauseList data={causeDataRed} />
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
      ) : <div className='d-flex justify-content-center align-items-center'>{STRINGS.NO_DATA_FOUND}</div>}
    </>
  )
}

export default withSnackbar(BasicView)