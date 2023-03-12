import axios from 'axios';
import { withSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCauseAllData, setCauseAllData } from '../../Redux/Actions/CauseData';
import { errorSnackbar } from '../../Shared/Utilities';
import "./style.scss"
const BasicView = ({enqueueSnackbar}) => {
  
  const dispatch = useDispatch();
  const causeDataRed = useSelector((state) => state.causeData.cause_data)

  const fetchCauseData = async () => {
    try {
      const {data, status} = await axios.get(
        "http://localhost:7000/api/causeList"
      );
      // let msg = "Successfully Registered";
      // enqueueSnackbar(msg, successSnackbar);
      console.log(data)
      dispatch(setCauseAllData(data?.data))
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      // let err = "Something went wrong";
      enqueueSnackbar(err, errorSnackbar);
    }
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
          {causeDataRed ? causeDataRed.map((item, ind) => (
            <div className='cause_box my-2 p-3' key={ind}>
              <div className='cause_title'>
                 {item.title}
              </div>
              <div className="cause_description">
                {item?.description}
              </div>
            </div>
          )) : null}
      </div>
    </>
  )
}

export default withSnackbar(BasicView)