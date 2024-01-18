import React from "react";
import { ColorRing } from "react-loader-spinner";
import Logo from "../../assets/icons/Logo_symbol_caizcoin.svg";

import "./modal.scss";

const EarnModal = ({ title, descriptions, step, handleClick }) => {
  return (
    <div className="earn-modal">
      <div className="title">
        <img src={Logo} alt="logoCaizearn" />
        <h3>{title}</h3>
      </div>
      <div className="body">
        {step === 1 ? (
          <>
            <div className="d-flex justify-content-center py-5">
              <ColorRing
                visible={true}
                height="50"
                width="50"
                ariaLabel="blocks-loading"
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            </div>
            <div className="descriptions">
              <h3>{descriptions}</h3>
            </div>

            <div className="d-flex justify-content-end">

              <div className="step-number">
                <h3>Step {step}/3</h3>
              </div>
            </div>
          </>
        ) : null}
        {step === 2 ? (
          <>
            <div className="descriptions">
              <h3 className="pt-4">{descriptions}</h3>
            </div>{" "}
            <button onClick={handleClick}>Lock Tokens</button>
            <div className="d-flex justify-content-end">

              <div className="step-number">
                <h3>Step {step}/3</h3>
              </div>
            </div>
          </>
        ) : null}
        {step === 3 ? (
          <>
            <div className="d-flex justify-content-center py-5">
              <ColorRing
                visible={true}
                height="50"
                width="50"
                ariaLabel="blocks-loading"
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            </div>
            <div className="descriptions">
              <h3>{descriptions}</h3>
            </div>
            <div className="d-flex justify-content-end">

            <div className="step-number">
              <h3>Step {step}/3</h3>
            </div>
            </div>
          </>
        ) : null}
        {step === 4 ? (
          <>
            <div className="d-flex justify-content-center py-5">
              <ColorRing
                visible={true}
                height="50"
                width="50"
                ariaLabel="blocks-loading"
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            </div>
            <div className="descriptions">
              <h3>{descriptions}</h3>
            </div>
            
          </>
        ) : null}
        {step === 5 ? (
          <> 
          <div className="d-flex justify-content-center py-5">           
            <div className="descriptions">
              <h3>{descriptions}</h3>
            </div>
          </div>
            
          </>
        ) : null}        
      </div>
    </div>
  );
};

export default EarnModal;
