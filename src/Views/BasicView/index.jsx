import { Pagination } from '@mui/material';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPagination from '../../Components/Atoms/ReactPaginate';
import { getCauseAllData, setCauseAllData } from '../../Redux/Actions/CauseData';
import { startLoader, stopLoader } from '../../Redux/Actions/Loader';
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

  const [causeList , setCauseList] = useState("")
  const [totalPageCount , setTotalPageCount] = useState("")

  useEffect(() => {
    if (causeDataRed && causeDataRed !== causeList) {
      setCauseList(causeDataRed)
      return
    }
  }, [causeDataRed])

  const fetchCauseData = async () => {
    try {
      dispatch(startLoader())
      const {data, status} = await axios.get(
        `http://localhost:7000/api/causeList?limit=${limitRef.current}&skip=${skipRef.current}`
      );
      console.log(data)
      totalPageRef.current = Math.ceil(data.totalCount/10)
      setTotalPageCount(Math.ceil(data.totalCount/10))
      // debugger;
      dispatch(setCauseAllData(data?.data))
    } catch (error) {
      console.error(error);
      enqueueSnackbar(err, errorSnackbar);
    } finally {
      dispatch(stopLoader())
    }
  }

  const handlePageClick = (e) => {
    console.log(e)
  }

  useEffect(() => {
    // dispatch(getCauseAllData({ 
    //   success: () =>{},
    //   fail: (errMsg) => {
    //     let err = errMsg ? errMsg : "Something went wrong"
    //     enqueueSnackbar(err, errorSnackbar)
    //   }
    // }))
    fetchCauseData()
  }, [])

  console.log(causeDataRed)

  return (
    <>
      <div className="cause_data_list my-5">
          <CauseList data={causeList} />
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