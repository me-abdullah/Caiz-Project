import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/CaizEarn_logo_withhadow.png";
import powerSwitch from "../../assets/icons/power-switch.svg";
import Cards from "./cards";
import TransactionsHistory from "./transactions-history/transactions-history";
import Cookies from "universal-cookie";
import lockTokenABI from "../utils/lockTokenABI.json";
import Web3 from "web3";
import Modal from "react-modal";
import EarnModal from "../earn-modal/index";
import ErrorModal from "../dashboard/error-modal";

import "./dashboard.scss";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const cookies = new Cookies();

  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setstep] = useState(0);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [ethereumAccount, setEthereumAccount] = useState(cookies.get("WID"));
  const [lockedBalance, setLockedBalance] = useState(0);
  let tokenAddress;
  let lockTokenAddress;
  let environment = "PROD";
  if(environment == "PROD") {
    tokenAddress = "0xAEbBd7B2eB03f84126f6849753b809755D7532F9"; 
    lockTokenAddress = "0x474eF598a176133cA306a96441475B6656182dD2";
  }
  else if(environment == "DEV") {
    tokenAddress = "0xB9008887143982941450F0cCe3CD86D54A1d5884";  // Goerli 
    lockTokenAddress = "0x9be77A86274f416642D2507611045AaCAE8f3Dbe"; // Goerli
    //tokenAddress = "0xB4a31c50f15a214daaEeB99F4c58C2A6D6cFe3a5"; // sepolia
    //lockTokenAddress = "0x34F36aD716e559E1d0B70DF12bd3a795816c4e44"; // sepolia
  }
  const web3 = new Web3(window.ethereum);  
  const lockTokenContract = new web3.eth.Contract(
    lockTokenABI,
    lockTokenAddress
  );
  const [totalReturn, setTotalReturn] = useState(0);
  const [transactionHistoryData, setTransactionHistoryData] = useState([]);
  useEffect(() => {
    const getAddress = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setEthereumAccount(accounts[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAddress();

    const getAllDepositIds = async () => {
      const AllDepositIds = await lockTokenContract.methods
        .getDepositsByWithdrawalAddress(ethereumAccount)
        .call();
      const promises = AllDepositIds.map((item) => {
        return new Promise((resolve) => {
          resolve(lockTokenContract.methods.getDepositDetails(item).call());
        });
      });
      Promise.all(promises).then((results) => {
        console.log(results);
        setTransactionHistoryData(results);
      });
    };

    getAllDepositIds();

    if (window.ethereum) {
      setIsMetamaskInstalled(true);
    }
  }, []);

  useEffect(() => {
    const calculateEarnAmount = async () => {
      const depositIds = await lockTokenContract.methods
        .getDepositsByWithdrawalAddress(ethereumAccount)
        .call();
      let allDeposits = [];
      let totalReturn = 0;

      for (var i = 0; i < depositIds.length; i++) {
        const details = await lockTokenContract.methods
          .getDepositDetails(depositIds[i])
          .call();
        if (parseInt(details[5]) > 6)
          totalReturn +=
            parseInt(Web3.utils.fromWei(`${details[2]}`, "ether")) *
            (parseInt(details[5]) / 10000);
        else
          totalReturn +=
            parseInt(Web3.utils.fromWei(`${details[2]}`, "ether")) *
            (parseInt(details[5]) / 20000);
        allDeposits.push(details);
      }
      setTotalReturn(Math.round(totalReturn * 100) / 100);
    };
    calculateEarnAmount();
  }, []);

  function connectMetamaskWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setEthereumAccount(accounts[0]);

        cookies.set("WID", accounts[0], {
          path: "/",
          secure: true,
        });
      })
      .catch((error) => {
        console.log(`Something went wrong: ${error}`);
      });
  }

  // how to get the total locked Balance for the linked address
  useEffect(() => {
    const totalBalanceByAddress = async () => {
      const balance = await lockTokenContract.methods
        .getTokenBalanceByAddress(ethereumAccount)
        .call();
      setLockedBalance(Web3.utils.fromWei(`${balance}`, "ether"));
    };
    totalBalanceByAddress();
  }, []);

  
  const handleUnlockTokenTransactions = async (item) => {   
    try {
      setIsOpen(true);
      setstep(4);
      let gasPrice = await web3.eth.getGasPrice();
      console.log(
        "gasPrice",
        gasPrice + " toHex: " + web3.utils.toHex(gasPrice)
      );

      
      const unlockTransactionResult = await lockTokenContract.methods
        .withdrawTokens(
          item
        )
        .send({
          from: ethereumAccount,
          gas: 370000,
          gasPrice: web3.utils.toHex(gasPrice),
        });
        
        
      setstep(5);
    } catch (error) {
      setstep(0);
      setIsOpen(false);
      setErrorModalIsOpen(true);
      setErrorDescription(error.message);
    }    
  };
  
  function closeModal() {
    setIsOpen(false);
  }
  function closeErrorModal() {
    setErrorModalIsOpen(false);
  }

  const errorCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      borderRadius: "4px",
      width: "25%",
    },
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      borderRadius: "4px",
      width: "25%",
    },
  };
  return (
    <div className="dashboard container">
      <div className="row header">
        <div className=" col-lg-5 ">
          <div className="d-flex justify-content-center justify-content-lg-start logo-img ">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="address-container">
            <p>
              Connect <br /> Wallet Address
            </p>
            <div className="wallet-address">
              <h3>{ethereumAccount}</h3>
            </div>
            <button onClick={connectMetamaskWallet}>
              <img src={powerSwitch} alt="power-switch" />
            </button>
          </div>
          {!isMetamaskInstalled && <h3>Please Install Metamask !</h3>}
        </div>
      </div>
      <div className="row cards-container">
        <div className="col-md-4 mb-2">
          <Cards lockedAmount={lockedBalance} lockCard={true} />
        </div>
        <div className="col-md-4 mb-2">
          <Cards earnedAmount={totalReturn} earnCard={true} />
        </div>
        <div className="col-md-4 mb-2">
          <Cards earnMoreBtn={true} />
        </div>
      </div>
      <div className="transactions-history">
        {transactionHistoryData.length && (
          <TransactionsHistory data={transactionHistoryData} handleUnlock={handleUnlockTokenTransactions} />
        )  }
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Wallet Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        {step === 1 ? (
          <EarnModal
            title={"Approve the transaction"}
            descriptions={
              "Please APPROVE the transction in your wallet"
            }
            step={1}
          />
        ) : null}
        {step === 4 ? (
          <EarnModal
            title={"Approve the transaction"}
            descriptions={
              "Please APPROVE the transction in your wallet and wait until transaction is approved."
            }
            step={4}
          />
        ) : null}
        {step === 5 ? (
          <EarnModal
            title={"Tokens Withdrawn"}
            descriptions={
              "You have withdrawn your tokens. They are now in your original wallet again. Please refresh your page."
            }
            step={5}
          />
        ) : null}              
      </Modal>
      <Modal
        isOpen={errorModalIsOpen}
        onRequestClose={closeErrorModal}
        style={errorCustomStyles}
        contentLabel="Wallet Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <ErrorModal
          description={errorDescription}
          title={"Low Eth Balance"}
          buttonFunction={closeErrorModal}
          tryAgain={handleUnlockTokenTransactions}
          method="unolock"
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
