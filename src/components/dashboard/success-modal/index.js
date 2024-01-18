import React from 'react'
import fireworks from "../../../assets/icons/fireworks.svg"

import"./success-modal.scss"

const SuccessModal = ({
    title,
    buttonFunction,
    lockedAmount,
    lockedPeriod,
    YearlyReward
  }) => {
    return (
      <div className="success-modal">
        <div className="title">
          <img src={fireworks} alt="firework icons" />
          <h3>{title ? title : <>You Have successfully <br/>pooled your Caizcoin tokens</>}</h3>
        </div>
        <div className="description">
            <h3>Pooled Amount: <strong>
            {lockedAmount}
              </strong></h3>
            <h3>Duration: <strong>
            {lockedPeriod} Months
              </strong></h3>
            <h3>Yearly Reward: <strong>
            {YearlyReward}%
              </strong></h3>
            </div>
        <div className="button-container">
          <button type="button" onClick={buttonFunction}>
            Dashboard
          </button>
        </div>
      </div>
    );
  };

export default SuccessModal