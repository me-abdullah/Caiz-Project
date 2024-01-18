import React from "react";
import warning from "../../../assets/icons/warning.svg"


import "./error-modal.scss";

const ErrorModal = ({
  description,
  title = "Wallet Connect Error",
  buttonFunction,
  tryAgain,
  method="Lock"
}) => {
  return (
    <div className="error-modal">
      <div className="title">
      <img src={warning} alt="firework icons" />
        <h3>{tryAgain ? <>{method} Transaction Error</> : title}</h3>
      </div>
      <div className="description">{description}</div>
      <div className="button-container">
        <button type="button" onClick={tryAgain ? tryAgain : buttonFunction}>
          {tryAgain ? " Try Again" : "OK"}
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
