import Tippy from "@tippyjs/react";
import moment from "moment/moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUpdatedToken } from "../../../Redux/Actions/Auth";
import { STRINGS, STRING_NUMBER, TAB_MINT } from "../../../Shared/Constants";
import { ROUTE_CONSTANTS } from "../../../Shared/Routes";
import ReactTippy from "../../Atoms/ReactTippy";
import ProfileTippyContent from "../../Cells/ProfileTippyContent";
// import LoginIcon from '@mui/icons-material/Login';
// import ExploreIcon from '@mui/icons-material/Explore';
import "./style.scss";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileTippy, setProfileTippy] = useState(false)

  const handleTab = (e) => {
    console.log(e);
  };

  const handleClick = (e) => {
    console.log(e)
    switch (e.value) {
      case STRING_NUMBER.TWO:
        navigate({pathname: ROUTE_CONSTANTS.ADD_CAUSE})
        break;
    
      default:
        break;
    }
  }
  
  return (
    <>
      <div className="shadow-sm p-3 mb-5  uiHeader">
        <div className="d-flex justify-content-between align-items-center px-5 ">
          <div onClick={() => navigate(ROUTE_CONSTANTS.DASHBOARD)}>
            {/* <ExploreIcon /> */}
            {STRINGS.SUPPORT_PEOPLE}
          </div>
          <div  onClick={() => navigate(ROUTE_CONSTANTS.DASHBOARD)}></div>
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              
              <ReactTippy 
                placement="bottom"
                TippyContent={<ProfileTippyContent handleClick={handleClick} />}
                interactive={true}
              >
                <div className="m-2">Profile</div>
              </ReactTippy>
            </div>

          </div>
        </div>
        {/* <div className="d-flex justify-content-between my-3 px-5 subheading">
          {TAB_MINT.map((item, index) => {
            return (
              <div
                key={index}
                className="mx-2 tabclass"
                onClick={() => handleTab(item)}
              >
                {item?.label}
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
};

export default Header;
