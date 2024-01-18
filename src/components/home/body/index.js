import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../../assets/icons/arrow_black.svg";
import CaizEarnConnectIcon from "../../../assets/icons/CaizEarn_Connect_ico.svg";
import bn1 from "../../../assets/images/Active_role_in_development.jpg";
import bn2 from "../../../assets/images/liquidity_image.jpg";
import bn3 from "../../../assets/images/priority_usage.jpg";
import bn4 from "../../../assets/images/Security_image.jpg";
import Cookies from "universal-cookie";
import MetaMask from "../../../assets/icons/metamask.svg";
import LoginLoader from "../../login-loader/login-loader";
import Modal from "react-modal";
import ErrorModal from "../../dashboard/error-modal";
import { isMobile } from "react-device-detect";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3 from "web3";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import "./button-section.scss";

const ButtonSection = () => {
  const cookies = new Cookies();

  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [loaderData, setLoaderData] = useState({
    logo: MetaMask,
    title: "Metamask",
    TileBackgroundColor: "#f69f1c",
  });
  let useNetworkID = "1"; // "11155111" for sepolia, "1" for mainnet, "5" for goerli
  const [network, setNetwork] = useState(useNetworkID);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.ethereum) {
      setIsMetamaskInstalled(true);
      window.ethereum
        .request({ method: "net_version" })
        .then(function (result) {
          setNetwork(result);
        });
    }
  }, []);

  window.addEventListener("load", function () {
    if (window.ethereum) {
      setIsMetamaskInstalled(true);
      console.log(window.ethereum);

      // // use MetaMask's provider
      // window.ethereum.enable(); // get permission to access accounts

      // detect Metamask account change

      window.ethereum.on("accountsChanged", function (accounts) {
        console.log("accountsChanges", accounts[0]);
        if (accounts.length !== 0) {
          setErrorModalIsOpen(true);
          setErrorDescription(
            "account has Changed please reconnect with this account"
          );
        }
      });

      // detect Network account change
      window.ethereum.on("networkChanged", function (networkId) {
        console.log("accountsChanges", networkId);
        setNetwork(networkId);
        if (networkId !== useNetworkID) {
          setErrorModalIsOpen(true);
          setErrorDescription(
            "Network has changed, please return to the main network"
          );
        } else {
          setErrorModalIsOpen(false);
        }
      });
    } else if (!isMobile) {
      setErrorModalIsOpen(true);
      setErrorDescription("Please install metamask");
      // window.open("https://metamask.io/download/", "_blank");
    }
  });
  const [account, setAccount] = useState("");

  let mobileMessage = null;
  if (isMobile) {
    mobileMessage = (
      <div className="desktop-only">
        Please open this Caiz Earn page on your computer
      </div>
    );
  }
  const handleRedirect = async () => {
    if (isMetamaskInstalled) {            
      try {        
        if (network === useNetworkID) {
          setErrorModalIsOpen(false);
          setIsOpen(true);
          setErrorModalIsOpen(false);
          await window.ethereum
            .request({
              method: "eth_requestAccounts",
            })
            .then((accounts) => {
              cookies.set("WID", accounts[0], {
                path: "/",
                secure: true,
              });
              navigate("/dashboard");
              setIsOpen(false);
            })
            .catch((error) => {
              console.log("metamask1 ", error);
              setIsOpen(false);
              setErrorModalIsOpen(true);
              setErrorDescription(error.message);
            });
        } else if (!isMobile) {
          setIsOpen(false);
          setErrorModalIsOpen(true);
          setErrorDescription(
            "You are connected to a wrong network. Please change to Ethereum Mainnet in your wallet.", network
          );
        }
      } catch (error) {
        console.log("metamask2 ", error);
        setIsOpen(false);
        setErrorModalIsOpen(true);
        setErrorDescription(error.message);
      }
    } else {
      setIsOpen(false);
      setErrorModalIsOpen(true);
      setErrorDescription("Please install metamask");
    }
  };

  const handleClick = async (numberOfMonths) => {
    if (isMobile) {
      // const provider = new WalletConnectConnector({
      //   rpc: {
      //     1: "https://mainnet.infura.io/v3/24ee455a6a0e4c058ba2bbc6323e1fe7", // Replace with your Infura Project ID
      //     5: "https://goerli.infura.io/v3/24ee455a6a0e4c058ba2bbc6323e1fe7", // Replace with your Infura Project ID
      //   },
      //   bridge: "https://bridge.walletconnect.org",
      // });
      // const web3 = new Web3(provider);
      // try {
      //   await provider.deactivate();
      //   setAccount("");
      //   //Enable the provider to connect to the user's wallet
      //   await provider.activate();
      //   // Get the user's account
      //   const accounts = await web3.eth.getAccounts();
      //   // Update the state with the user's account
      //   setAccount(accounts[0]);
      //   navigate("/form", {
      //     state: { numberOfMonths: numberOfMonths },
      //   });
      // } catch (error) {
      //   console.error(error);
      // }
    } else {
      if (isMetamaskInstalled) {
        try {
          if (network === useNetworkID) {
            setErrorModalIsOpen(false);
            setIsOpen(true);
            setErrorModalIsOpen(false);
            await window.ethereum
              .request({
                method: "eth_requestAccounts",
              })
              .then((accounts) => {
                cookies.set("WID", accounts[0], {
                  path: "/",
                  secure: true,
                });
                navigate("/form", {
                  state: { numberOfMonths: numberOfMonths },
                });
                setIsOpen(false);
              })
              .catch((error) => {
                console.log("metamask1 ", error);
                setIsOpen(false);
                setErrorModalIsOpen(true);
                setErrorDescription(error.message);
              });
          } else if (!isMobile) {
            setIsOpen(false);
            setErrorModalIsOpen(true);
            setErrorDescription(
              "You are connected to a wrong network. Please change to Ethereum Mainnet in your wallet."
            );
          }
        } catch (error) {
          console.log("metamask2 ", error);
          setIsOpen(false);
          setErrorModalIsOpen(true);
          setErrorDescription(error.message);
        }
      } else {
        setIsOpen(false);
        setErrorModalIsOpen(true);
        setErrorDescription("Please install metamask");
        // window.open("https://metamask.io/download/", "_blank");
      }
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
      width: "75%",
      maxWidth: "400px",
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
      maxWidth: "400px",
    },
  };

  return (
    <div>
      <div className="bg-img">
        <div className="button-section container">
          <div className="body-container">
            <div className="description ">
              <h1>
                <strong>
                  I WANT TO <br />
                  PARTICIPATE <br />
                </strong>
                IN THE CAIZ <br /> EARN PROGRAM
              </h1>
              <div className="arrow-container">
                <h3>
                  Click to pool tokens for <img src={arrow} alt="arrow" />
                </h3>
              </div>
            </div>
            <div className="lock-period-container" id="lock-period-container">
              <button
                type="button"
                id="6Month"
                className="lock-period-btn mx-sm-4"
                onClick={() => handleClick(6)}
              >
                {mobileMessage}
                <h3>DURATION</h3>
                <h1>6</h1>
                <h3 className="month">MONTHS</h3>
                <p>5% annual return</p>

              </button>
              <button
                type="button"
                id="12Month"
                className="lock-period-btn lock-period-12-btn mx-sm-4"
                onClick={() => handleClick(12)}
              >
                {mobileMessage}
                <h3>DURATION</h3>
                <h1>12</h1>
                <h3 className="month">MONTHS</h3>
                <p><u>7%</u> annual return</p>
              </button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Wallet Modal"
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <LoginLoader
            loaderLogo={loaderData.logo}
            loaderTitle={loaderData.title}
            TileBackgroundColor={loaderData.TileBackgroundColor}
            description={errorDescription}
            errorModalIsOpen={errorModalIsOpen}
          />
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
            buttonFunction={closeErrorModal}
          />
        </Modal>
      </div>
      <div className="dashboard-redirect-btn-container container-fluid ">
        <h1>ALREADY LOCKED YOUR TOKENS?</h1>
        <div className="d-flex justify-content-center">
          <button type="button" onClick={handleRedirect}>
            <img src={CaizEarnConnectIcon} alt="connection logo" /> CONNECT WALLET
          </button>
        </div>
      </div>
      <div className="container-fluid bg-gray">
        <div className="container pt-5 pb-5">
          <div className="row text-center">
            <h1 className="foManEb">CAIZ EARN</h1>
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <p>
                  {" "}
                  Caiz Earn is a liquidity provision program within the Caiz
                  Ecosystem, allowing users to lock their Caizcoin into a
                  liquidity pool wallet and provide liquidity services via
                  predefined market-making algorithms. This activity helps
                  stabilize and promote ecosystem growth while enabling users to
                  earn.The program operates in coordination with the Exchange
                  Liquidity Wallet and the other locked Caizcoin in the Caiz
                  Earn program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid benefits-container bg-white pb-5 pt-5">
        <div className="container pt-5">
          <div className="row">
            <h1 className="foManEb">WHAT ARE CAIZ EARN BENEFITS?</h1>
            <div className="col-md-6 text-start mt-5">
              <div className="row">
                <div className="offset-md-1 col-md-10">
                  <img src={bn1} />
                </div>
                <div className="offset-md-2 col-md-8 mt-3">
                  <h4 className="foManEb">ACTIVE ROLE IN DEVELOPMENT</h4>
                  <p>
                    By providing liquidity to the Caiz ecosystem through the
                    program, users play an active role in the development of the
                    ecosystem. This helps to improve the stability and
                    accessibility of the ecosystem for all users.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-start mt-5">
              <div className="row">
                <div className="offset-md-1 col-md-10">
                  <img src={bn4} />
                </div>
                <div className="offset-md-2 col-md-8 mt-3">
                  <h4 className="foManEb">SECURITY</h4>
                  <p>
                    The Caizcoins in the Liquidity-Pool are locked and mirrored
                    in the pool, which means they can never be lost. This
                    ensures the security of the funds in the pool and provides
                    peace of mind for users who participate in the program.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-start mt-5">
              <div className="row">
                <div className="offset-md-1 col-md-10">
                  <img src={bn3} />
                </div>
                <div className="offset-md-2 col-md-8 mt-3">
                  <h4 className="foManEb">PRIORITY USAGE</h4>
                  <p>
                    Users who pool their Caizcoins in the Liquidity-Pool are
                    given priority for usage in the order match-making process.
                    The Caizcoins with the longest locked period is given the
                    highest priority. This means that profit potential is first
                    distributed to Caizcoin users, which is a benefit for those
                    who participate in the program.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-start mt-5">
              <div className="row">
                <div className="offset-md-1 col-md-10">
                  <img src={bn2} />
                </div>
                <div className="offset-md-2 col-md-8 mt-3">
                  <h4 className="foManEb">LIQUIDITY</h4>
                  <p>
                    The CEP helps to improve the stability and accessibility of
                    the ecosystem by providing liquidity. By matching buy and
                    sell orders in several locations, even if they have
                    different market conditions, the program helps to maintain
                    liquidity across the ecosystem. This improves the overall
                    user experience and contributes to the long-term growth and
                    usability of the Caiz ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid steps-container bg-black pt-5">
        <div className="container pt-5">
          <div className="row">
            <h1 className="foManEb steps-title">
              HOW TO PARTICIPATE IN CAIZ EARN?
            </h1>
            <div className="col-md-12 mt-5 mb-3">
              <span className="step foManEb">1</span>
            </div>
            <div className="col-md-12 mb-5 mt-5">
              <h4>CHOOSE THE LOCKING PERIOD:</h4>
              <div className="row mt-4">
                <div className="offset-md-2 col-md-4 mb-3">
                  <div className="offset-md-1 col-md-10 lock-period">
                    <span className="title foManEb">LOCK PERIOD</span>
                    <span className="number foManEb">6</span>
                    <span className="type foManEb">MONTHS</span>
                    <span className="procent">5% ANNUALLY</span>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="offset-md-1 col-md-10 lock-period lock-t-period pb-5">
                    <span className="title foManEb">LOCK PERIOD</span>
                    <span className="number foManEb">12</span>
                    <span className="type foManEb">MONTHS</span>
                    <span className="procent">8% ANNUALLY</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-5 mb-3">
              <span className="step foManEb">2</span>
            </div>
            <div className="offset-md-3 col-md-6 mb-5 mt-5">
              <h4>
                CONNECT YOUR CRYPTO WALLET BY FOLLOWING INSTRUCTIONS IN THE
                WALLET
              </h4>
            </div>
            <div className="col-md-12 mt-5 mb-3">
              <span className="step foManEb">3</span>
            </div>
            <div className="offset-md-3 col-md-6 mb-5 mt-5">
              <h4>
                ENTER THE NUMBER OF CAIZCOIN TOKEN YOU WANT TO LOCK AND CHECK
                ALL DETAILS
              </h4>
            </div>
            <div className="col-md-12 mt-5 mb-3">
              <span className="step foManEb">4</span>
            </div>
            <div className="offset-md-3 col-md-6 mb-5 mt-5">
              <h4>
                CLICK ON LOCK TOKEN AND COMFIRM THE TRANSACTION IN YOUR CRYPTO
                WALLET
              </h4>
            </div>
            <div className="col-md-12 mt-5 mb-3">
              <span className="step foManEb">5</span>
            </div>
            <div className="offset-md-3 col-md-6 mb-5 mt-5">
              <h4>CONGRATS, YOU DID IT RIGHT!</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-gray">
        <div className="container pt-5 pb-5">
          <div className="row text-center">
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <p>
                  You can see the pooled Caizcoin token balance and transaction
                  records in the Caiz Earn Dashboard. The rewards will be
                  distributed automatically every 3 months to your crypto wallet
                  ERC20 address. After expiration of the pooled period, you can
                  release your Caizcoin tokens and transfer back to your ERC20
                  crypto wallet or extend the pooling period for earning more
                  rewards. Pool more Caizcoin token anytime as you desire. There
                  is no limit for the amount of Caizcoin tokens you can pool.
                </p>
                <a className="btn btn-black" href="#lock-period-container">
                  PARTICIPATE NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonSection;
