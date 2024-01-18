import React from "react";

import copyright from "../../assets/icons/copyright.svg";
import databaselock from "../../assets/icons/database-lock.svg";
import databasesearch from "../../assets/icons/database-search.svg";
import discord from "../../assets/icons/discord.svg";
import facebook from "../../assets/icons/facebook.svg";
import instagram from "../../assets/icons/instagram.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import medium from "../../assets/icons/medium.svg";
import robot from "../../assets/icons/reddit.svg";
import serverlock from "../../assets/icons/server-lock.svg";
import telegram from "../../assets/icons/telegram.svg";
import terms from "../../assets/icons/terms.svg";
import tiktok from "../../assets/icons/tiktok.svg";
import xtwitter from "../../assets/icons/x-twitter.svg";
import youtube from "../../assets/icons/youtube.svg";
import Logo_DevelopedEU from  "../../assets/images/Logo_DevelopedEU.png";
import Logo_ISO14001 from  "../../assets/images/Logo_ISO14001.png";
import Logo_WeTakeClimateAction from  "../../assets/images/Logo_WeTakeClimateAction.png";
import logo_CONeutral from  "../../assets/images/logo_CONeutral.png";
import logo_certik from  "../../assets/images/logo_certik.png";

import "./footer-bottom.scss";

const FooterBottom = () => {
  return (
    <>
    <div className="footer-bottom">
      <div className="row">
        <div className="social-media col-lg-5">
          <nav>
            <a
              rel="noopener"
              href="https://www.reddit.com/r/Caizcoin/"
              target="_blank"
            >
              <img
                src={robot}
                className="lazy"
                alt="reddit"
                width="35"
                height="35"
              />
            </a>
            <a rel="noopener" href="https://twitter.com/caizcoin" target="_blank">
              <img
                src={xtwitter}
                className="lazy"
                alt="twitter"
                width="35"
                height="35"
              />
            </a>
            <a
              rel="noopener"
              href="https://www.instagram.com/caizcoin/"
              target="_blank"
            >
              <img
                src={instagram}
                className="lazy"
                alt="instagram"
                width="35"
                height="35"
              />
            </a>
            <a
              rel="noopener"
              href="https://www.facebook.com/Caizcoin/"
              target="_blank"
            >
              <img
                src={facebook}
                className="lazy"
                alt="facebook"
                width="35"
                height="35"
              />
            </a>
            <a
              rel="noopener"
              href="https://www.youtube.com/channel/UCiUX3Q8oga8cQRp7foeuR4A"
              target="_blank"
            >
              <img
                src={youtube}
                className="lazy"
                alt="youtube"
                width="35"
                height="35"
              />
            </a>
            <a rel="noopener" href="https://caizcoin.medium.com/" target="_blank">
              <img
                src={medium}
                className="lazy"
                alt="medium"
                width="35"
                height="35"
              />
            </a>
            <a
              rel="noopener"
              href="https://www.linkedin.com/company/caizcoin/"
              target="_blank"
            >
              <img
                src={linkedin}
                className="lazy"
                alt="linkedin"
                width="35"
                height="35"
              />
            </a>
            <a
              rel="noopener"
              href="https://www.tiktok.com/@caizcoin"
              target="_blank"
            >
              <img
                src={tiktok}
                className="lazy"
                alt="tiktok"
                width="35"
                height="35"
              />
            </a>
            <a
              rel="noopener"
              href="https://discord.gg/J8c8A5zst2"
              target="_blank"
            >
              <img
                src={discord}
                className="lazy"
                alt="discord"
                width="35"
                height="35"
              />
            </a>
            <a
              rel="noopener"
              href="https://t.me/caizcoin_official"
              target="_blank"
            >
              <img
                src={telegram}
                className="lazy"
                alt="telegram"
                width="35"
                height="35"
              />
            </a>
          </nav>
        </div>
        <div className="partners col-lg-5 ">
          <img src={logo_certik} alt="user icon" />
          <img src={logo_CONeutral} alt="user icon" />
          <img src={Logo_ISO14001} alt="user icon" />
          <img src={Logo_WeTakeClimateAction} alt="user icon" />
          <img src={Logo_DevelopedEU} alt="user icon" />
        </div>
      </div>
    </div>
    <div className="footer-bottom-modified">
      <div className="row ">
        <div className="site-links col-lg-6">
            <a href="https://caiz.com/terms-of-use/" target="_blank" className="me-1">
              <img src={terms} alt="terms" /><span className="foOpenSans">Terms of use</span>
            </a>{" "}
            <a href="https://caiz.com/privacy-policy/" target="_blank" className="me-1">
            <img src={serverlock} alt="privacypolicy" /><span className="foOpenSans">Privacy Policy</span>
            </a>{" "}
            <a href="https://caiz.com/cookie-policy/" target="_blank" className="mx-1">
            <img src={databaselock} alt="cookie" /><span className="foOpenSans">Cookie</span>
            </a>{" "}
            <a href="https://caiz.com/company-information/" target="_blank" className="mx-1">
            <img src={databasesearch} alt="imprint" /><span className="foOpenSans">Imprint</span>
            </a>{" "}
            <a href="https://caiz.com/copyright-policy/" target="_blank" className="ms-1">
            <img src={copyright} alt="copyright" /><span className="foOpenSans">Copyright</span>
            </a>
          </div>
          <div className="copyright col-lg-6">
            <p> <b>Caiz Trade S.r.o.</b> &copy; 2020-2024. All rights reserved.</p>
        </div>
      </div>
    </div>
    </>
);
};

export default FooterBottom;
