import React from "react";
import logo from "../../../assets/icons/CaizEarn_logo_withhadow.png";

import "./header.scss"

const Header = () => {
  return (
    <div className="header container">
      <div className="row ">
        <div className="col-xl-6">
          <div className="d-flex justify-content-center ">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="col-xl-6 ">
          {/* <p>
          The Caiz Earn Program is designed to provide liquidity to the Caiz ecosystem while also allowing users to earn rewards for their participation. Be part of this exciting program and participate in Caiz Earn Program today!
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
