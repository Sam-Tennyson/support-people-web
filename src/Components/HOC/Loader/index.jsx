import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import "./style.scss";
import { useSelector } from "react-redux";

function Loader() {
  const loader = useSelector((state) => state.loading.loading) || "";

  return loader ? (
    <div className="loader">
      <div className="loader_class">
        <ThreeDots
          visible={loader}
          color="#514bd0"
          outerCircleColor=""
          middleCircleColor="#514bd0"
          innerCircleColor="#514bd0"
        />
      </div>
    </div>
  ) : null;

}

export default Loader;