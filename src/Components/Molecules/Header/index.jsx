import moment from "moment/moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUpdatedToken } from "../../../Redux/Actions/Auth";
import { STRINGS, TAB_MINT } from "../../../Shared/Constants";
// import TAB_MINT from ''
// import LoginIcon from '@mui/icons-material/Login';
// import ExploreIcon from '@mui/icons-material/Explore';
import "./style.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTab = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className="shadow-sm p-3 mb-5 bg-body rounded">
        <div className="d-flex justify-content-between align-items-center px-5 ">
          <div onClick={() => navigate(ROUTE_CONSTANTS.DASHBOARD)}>
            {/* <ExploreIcon /> */}
          </div>
          <div>{STRINGS.SUPPORT_PEOPLE}</div>
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div className="p-2" style={{cursor: "pointer"}} onClick={() => dispatch(setUpdatedToken(null))}> Logout </div>
              {/* <div className="p-2"><LogoutIcon /> Signout</div> */}
            </div>
            <div className="d-flex justify-content-center align-items-center">
              {moment(new Date()).format("ddd, DD MMM YYYY")}
            </div>
          </div>
        </div>
        <hr />
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
