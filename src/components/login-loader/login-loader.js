import React from "react";
import MetaMask from "../../assets/icons/metamask.svg";
import { ColorRing } from "react-loader-spinner";

import "./login-loader.scss";

const LoginLoader = ({
  loaderLogo = MetaMask,
}) => {
  return (
    <div className="login-loader">
      <div className="title">
      <div className="d-flex justify-content-center">

        <img src={loaderLogo} alt="MetaMask icon" className="logo" />
        </div>
        <div className="d-flex justify-content-center">
          <ColorRing
            visible={true}
            height="50"
            width="50"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={[]}
          />
        </div>
      </div>
      <div className="body">
        <p className="description">
          Please follow the instructions in your Metamask wallet.
        </p>
      </div>
    </div>
  );
};

export default LoginLoader;
