import moment from 'moment';
import React from 'react'
import { useDispatch } from 'react-redux'
import { setUpdatedToken } from '../../../Redux/Actions/Auth';
import { PROFILE_TIPPY, STRINGS } from '../../../Shared/Constants'

const ProfileTippyContent = ({handleClick}) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="listTippy ">
        {moment(new Date()).format("ddd, DD MMM YYYY")}
      </div>
      {PROFILE_TIPPY ? PROFILE_TIPPY.map((item, ind) => (
        <div className='listTippy ' key={ind}  onClick={()=> handleClick(item)}>
          {item?.label}
        </div>
      )) : null}
      <div className="listTippy " onClick={() => dispatch(setUpdatedToken(null))}> {STRINGS.LOGOUT} </div>
    </>
  )
}

export default ProfileTippyContent