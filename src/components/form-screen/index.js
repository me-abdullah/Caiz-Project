import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/CaizEarn_logo_withhadow.png";
import arrow from "../../assets/icons/arrow_black.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import tokenAbi from "../utils/tokenABI.json";
import lockTokenABI from "../utils/lockTokenABI.json";
import Web3 from "web3";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import Modal from "react-modal";
import EarnModal from "../earn-modal/index";
import ErrorModal from "../dashboard/error-modal";
import SuccessModal from "../dashboard/success-modal";

import "./form-screen.scss";

const EarnForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate();
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;

  function addMonthsToDate(months) {
    const currentDate = new Date();
    
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + months,
      currentDate.getDate()
    );
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const lockDate = `${day}/${month}/${year}`;
    return lockDate;
  }

  const location = useLocation();
  let endDate = addMonthsToDate(location?.state?.numberOfMonths);
  console.log("endDate: "+ endDate);
  const numberOfMonthsToLock = location?.state?.numberOfMonths;
  function dateToSeconds(dateString) {
    // convert date string to format "yyyy-mm-dd" for parsing by Date constructor
    const [day, month, year] = dateString.split("/");
    const formattedDate = `${year}/${month}/${day}`;
    const date = new Date(formattedDate);

    // set time to start of day
    date.setHours(0, 0, 0, 0);

    // convert to seconds since Unix epoch
    const seconds = Math.round(date.getTime() / 1000);
    return seconds; // returning the unlockDate in seconds


    // TESTING with 15 minute locking period
    /*
    const timeNow = Math.round(new Date().getTime() / 1000);
    const timeInFifteen = timeNow + 900;
    console.log("current time: " + timeNow + ' time in 15: ' + timeInFifteen);
    console.log('seconds: '+ seconds);       
    return timeInFifteen; // returns unlockDate in 15 minutes for testing
    */ 
  }

  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setstep] = useState(0);
  const unlockDateStamp = dateToSeconds(endDate);
  const [transactionApproved, setTransactionApproved] = useState(false);
  const [caizCoinSuply, setCaizCoinSuply] = useState(null);
  const [buttonText, setButtonText] = useState("Allocate Caiz (Step 1 of 2)");
  const [ethBalance, setEthBalance] = useState(0);
  const [enoughETH, setEnoughETH] = useState(true);
  const [maxCaiz, setMaxCaiz] = useState(0);
  const [tokensAreLocked, setTokensAreLocked] = useState(false);
  const [address, setAddress] = useState("");
  const web3 = new Web3(window.ethereum);
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
    //tokenAddress = "0xB4a31c50f15a214daaEeB99F4c58C2A6D6cFe3a5"; 
    //lockTokenAddress = "0x34F36aD716e559E1d0B70DF12bd3a795816c4e44";
  }
  const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
  const lockTokenContract = new web3.eth.Contract(lockTokenABI, lockTokenAddress);  
  let balanceEth = 0;

  useEffect(() => {
    const getAddress = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAddress(accounts[0]);

            let balance = await web3.eth.getBalance(accounts[0]);
            balanceEth = web3.utils.fromWei(balance, "ether");
            setEthBalance(balanceEth);           
            if (parseFloat(balanceEth) > 0.014) setEnoughETH(true);
            else setEnoughETH(false);

            let max = await getMaxCaiz();

            
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAddress();
  }, []);

  const handleApproveTransactions = async () => {
    
    try {
      setstep(1);
      setErrorModalIsOpen(false);
      setIsOpen(true);
      setButtonText(
        "Allocating your Caizcoin to the Pool.. Confirm Transaction in MetaMask and wait 30 seconds"
      );
      await tokenContract.methods
        .approve(lockTokenAddress, Web3.utils.toWei(caizCoinSuply))
        .send({ from: address });
      setTransactionApproved(true);
      setButtonText("Transfer Caiz (Step 2 of 2)");
      setIsOpen(false);
      setstep(2);
      setIsOpen(true);
    } catch (error) {
      setTransactionApproved(false);
      setstep(0);
      setIsOpen(false);
      setErrorModalIsOpen(true);
      setErrorDescription(error.message);
    }    
  };

const pourcentageToSend =  ((numberOfMonthsToLock === 12) ?   "700" : "500");

  const handleLockTokenTransactions = async (numberOfMonthsToLock) => {
    try {
      setIsOpen(false);
      setButtonText(
        "Transferring your Caizcoin to the Pool.. Confirm Transaction in MetaMask and wait 30 seconds"
      );
      setstep(3);
      setIsOpen(true);
      let gasPrice = await web3.eth.getGasPrice();
      console.log(
        "gasPrice",
        gasPrice + " toHex: " + web3.utils.toHex(gasPrice)
      );

      const lockTransactionResult = await lockTokenContract.methods
        .lockTokens(
          Web3.utils.toWei(caizCoinSuply),
          unlockDateStamp,
          pourcentageToSend
        )
        .send({
          from: address,
          gas: 370000,
          gasPrice: web3.utils.toHex(gasPrice),
        });

      setTokensAreLocked(true);
      setstep(4);
      setButtonText("Congratulations, Open your dashboard!");
    } catch (error) {
      setstep(0);
      setIsOpen(false);
      setErrorModalIsOpen(true);
      setErrorDescription(error.message);
    }
  };

  const getMaxCaiz = async () => {
    const balances = await tokenContract.methods.balanceOf(address).call();    
    let max = Web3.utils.fromWei(`${balances}`, "ether");
    setMaxCaiz(max);
    return max;
  };

  const handleMaxAmount = () => {
    const getBalance = async () => {
      const balances = await tokenContract.methods.balanceOf(address).call();      
      setCaizCoinSuply(Web3.utils.fromWei(`${balances}`, "ether"));
    };
    getBalance();
  };
  const handleYearlyIncome = (numberOfMonthsToLock) => {
    let poucentage = numberOfMonthsToLock === 6 ? 5 : 8;
    let YearlyReturn = (poucentage * caizCoinSuply) / 100;
    if(poucentage === 5) YearlyReturn = YearlyReturn / 2;
    return YearlyReturn;
  };
  const YearlyReturn = handleYearlyIncome(numberOfMonthsToLock);

  const formik = useFormik({
    initialValues: {
      walletAddress: "",
      amountToLock: "",
      startDate: "",
      endDate: "",
      yearlyReturn: "",
      email: "",
      name: "",
      mobile: "",
      agreement: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required(),
      name: Yup.string().required(),
      mobile: Yup.string().required(),
      agreement: Yup.boolean().oneOf(
        [true],
        "please agree on the terms and conditions"
      ),
    }),
    onSubmit: async (values, actions) => {
      if (tokensAreLocked) {
        const configuration = {
          method: "post",
          url: "https://api.caizcoin.com/api/v1/caizearn",
          data: {
            walletAddress: address,
            amountToLock: caizCoinSuply,
            startDate: currentDate,
            endDate: endDate,
            yearlyReturn: YearlyReturn,
            name: values.name,
            mobile: values.mobile,
            email: values.email,
          },
        };
        // as long as API endpoint is not updated, the navigate to dashboard is duplicated here
        navigate("/dashboard", { state: { address: address } });
        ///
        /* API update endpoint
        await axios(configuration)
          .then((result) => {            
            navigate("/dashboard", { state: { address: address } });
          })
          .catch((error) => {           
          });
          **/
        actions.resetForm();
      } else {
        if (!transactionApproved) handleApproveTransactions();
        else if (transactionApproved) handleLockTokenTransactions();
      }
    },
  });

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
      width: "75%",
      maxWith: "400px" 
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
      width: "75%",
      maxWidth: "400px"
    },
  };

  return (
    <div className="form-screen container">
      <div className="d-flex justify-content-center">
        <img src={logo} alt="logo" />
      </div>
      <div>
        <div className="row justify-content-between">
          <div className="description col-lg-6 col-xl-5">
            <h1>
              <strong>
                NEW <br />
              </strong>
              CAIZ EARN <br /> PARTICIPATION
            </h1>
            <div className="arrow-container">
              <h3>
                <strong>Fill the form</strong> <br /> to participate
              </h3>
              <img src={arrow} alt="arrow" />
            </div>
          </div>
          <div className="form-container col-lg-6 col-xl-7">
            <form onSubmit={formik.handleSubmit}>
              <div className="input-container">
                <div className="input-fields">
                  <label> Caiz Wallet Address </label>
                  <input
                    type="text"
                    className="subscribe-email"
                    name="walletAddress"
                    value={address}
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="input-container">
                  <div className="input-fields">
                    <label>Amount of Caizcoin to Pool </label>
                    <div className="d-flex">
                      <input
                        type="number"
                        className="subscribe-email"
                        name="amountToLock"
                        onChange={(e) => {
                          setCaizCoinSuply(e.target.value);
                        }}
                        value={caizCoinSuply}
                      />
                      <button
                        type="button"
                        className="max-amount-btn"
                        onClick={handleMaxAmount}
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                  {enoughETH ? null : (
                    <div className="error">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <span className="mt-1">
                        You don't have enough ETH in your wallet to proceed.
                        Please add at least 0.014 ETH in your wallet or contact us
                        with this message and your wallet address: {address}.
                      </span>
                    </div>
                  )}
                  {formik.touched.amountToLock && formik.errors.amountToLock ? (
                    <div className="error">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <span className="mt-1">{formik.errors.amountToLock}</span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="input-container">
                {caizCoinSuply === null ? null : (
                    <div className="input-fields">
                      <label>Summary </label>
                      <div className="d-flex align-items-center">
                        <h6>You will pool  {caizCoinSuply} Caiz  for a period of  {numberOfMonthsToLock} months  with a total return of  {YearlyReturn} Caiz</h6>                   
                      </div>
                    </div>
                  )}                
                <div className="input-container">
                  <div className="input-fields">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="subscribe-email"
                      name="email"
                      placeholder="Enter your Email address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <span className="mt-1">{formik.errors.email}</span>
                    </div>
                  ) : null}
                </div>
                <div className="input-container">
                  <div className="input-fields">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="subscribe-email"
                      name="name"
                      placeholder="Enter your name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <span className="mt-1">{formik.errors.name}</span>
                    </div>
                  ) : null}
                </div>
                <div className="input-container">
                  <div className="input-fields">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      className="subscribe-email"
                      name="mobile"
                      placeholder="Enter your mobile number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                    />
                  </div>
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className="error">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <span className="mt-1">{formik.errors.mobile}</span>
                    </div>
                  ) : null}
                </div>
                
                <div className="">
                  <div className="d-flex align-items-baseline checkbox-container pt-3">
                    <input
                      id="agreement"
                      name="agreement"
                      type="checkbox"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.agreement}
                      className="check-box-input"
                    />
                    <label className="px-2" htmlFor="agreement">
                      I agree with purchase terms and conditions.
                      <br />
                      <a href="https://caizcoin.com/terms-of-use.html" target="_blank">Terms & Conditions</a> |
                      <a href="https://caizcoin.com/privacy-policy.html" target="_blank" className="ms-1">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {formik.touched.agreement && formik.errors.agreement ? (
                    <div className="error">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <span className="mt-1">{formik.errors.agreement}</span>
                    </div>
                  ) : null}
                </div>
              </div>
              <button
                disabled={formik.values.email && formik.values.name && formik.values.mobile && (caizCoinSuply > 0) && formik.values.agreement  ? false : true}
                className={formik.values.email && formik.values.name && formik.values.mobile && (caizCoinSuply > 0) && formik.values.agreement   ? "btn" : "btn-disabled"}
                type="submit"
              >
                {formik.isSubmitting ? (
                  <div className="p-1">
                    <ColorRing
                      visible={true}
                      height="25"
                      width="25"
                      ariaLabel="blocks-loading"
                      wrapperClass="blocks-wrapper"
                      color="white"
                    />
                  </div>
                ) : (
                  "Pool Tokens"
                )}
              </button>
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
                {step === 2 ? (
                  <EarnModal
                    title={"Pool Caizcoin Token"}
                    descriptions={
                      "Click on Pool Tokens and CONFIRM the transaction in your metamask wallet..."
                    }
                    step={2}
                    handleClick={handleLockTokenTransactions}
                  />
                ) : null}
                {step === 3 ? (
                  <EarnModal
                    title={"Pool Caizcoin Token"}
                    descriptions={
                      "Transferring your Caizcoin tokens, please wait..."
                    }
                    step={3}
                  />
                ) : null}
                {step === 4 ? (
                  <SuccessModal
                    lockedAmount={caizCoinSuply}
                    lockedPeriod={numberOfMonthsToLock}
                    YearlyReward={numberOfMonthsToLock === 6 ? 5 : 8}
                    buttonFunction={formik.handleSubmit}
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
                  tryAgain={handleApproveTransactions}
                />
              </Modal>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnForm;
