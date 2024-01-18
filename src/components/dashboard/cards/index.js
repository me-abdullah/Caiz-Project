import React from "react";
import locked from "../../../assets/icons/locked.svg";
import plusCopy from "../../../assets/icons/plus-copy.svg";
import earnings2 from "../../../assets/icons/earnings2.svg";
import Logo from "../../../assets/icons/Logo_symbol_caizcoin.svg";
import { useNavigate } from "react-router-dom";

import "./cards.scss";

const Cards = ({ lockedAmount = "0" , lockCard , earnedAmount = "0" , earnCard , earnMoreBtn }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      {!earnMoreBtn && (
        <div className="cards">
          <div className="card">
            {( lockCard) ? (
              <>
                <div className="title">
                  <img src={locked} alt="locked logo" />
                  <h3>
                    Pooled <br /> Token Amount
                  </h3>
                </div>
                <div className="amount">
                  <img src={Logo} alt="logoCaizearn" />
                  <h3>{lockedAmount}</h3>
                </div>
              </>
            ) : null}
            {( earnCard) ? (
              <>
                <div className="title">
                  <img src={earnings2} alt="earning logo" />
                  <h3>
                    You Will <br /> Earn in Total
                  </h3>
                </div>
                <div className="amount">
                  <h3>
                    <img src={Logo} alt="logoCaizearn" />
                    {earnedAmount}
                  </h3>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
      {earnMoreBtn ? (
        <div className="cards">
          <button className="btn-container" onClick={handleClick}>
            <div className="card">
              <img src={plusCopy} alt="earn-more-button" />
              <h3>Earn More</h3>
            </div>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Cards;
