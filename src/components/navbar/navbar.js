import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/Logo_caizcoin_horizontal_white_menu.svg";
import discord from "../../assets/images/Discord.png";
import facebook from "../../assets/images/Facebook.png";
import instagram from "../../assets/images/instagram.png";
import twitter from "../../assets/images/Twitter.png";
import linkedln from "../../assets/images/linkedIn.png";
import medium from "../../assets/images/medium.png";
import reddit from "../../assets/images/reddit.png";
import telegram from "../../assets/images/Telegram.png";
import tiktok from "../../assets/images/TikTok.png";
import youtube from "../../assets/images/YouTube.png";
import group from "../../assets/icons/group.svg";
import world from "../../assets/icons/world.png";
import brain from "../../assets/icons/brain.svg";
import handshake from "../../assets/icons/handshake.svg";
import backButton from "../../assets/icons/back-button.svg";
import Logo_caiz_new from '../../assets/icons/Logo_caiz_new.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleCheck, faMap, faUser, faUsers, faCalendarDays, faHandshake, faStar, faHeart, 
faCoins, faHandHoldingDollar, faChartPie, faChartSimple,  faLaptopCode, faBullhorn, faPersonWalkingLuggage, 
faPeopleGroup, faHashtag, faSackDollar, faBuilding, faNewspaper, faDownload, faFileWord, faComments, faLock, 
faBriefcase, faGavel, faExclamationTriangle, faEnvelope, faPaste  } from '@fortawesome/free-solid-svg-icons';

import "./navbar.scss";

const closeMenu = (e) => {
  e.preventDefault();
  //document.querySelector("#change-className").classNameList.add('new-className-name');
  document.getElementById("navbarSubMenu").style.display = "none";
  e.stopPropagation();
}


const Navbar = () => {
  const [openMenue, setOpenMenue] = useState(false);
  const [openSubMenue, setOpenSubMenue] = useState(false);
  const [width, setWidth] = useState(window.innerWidth)
  const setOpenMenue2 = (e) => {
    setOpenMenue(!openMenue);
    e.preventDefault();
    if (!openMenue) {
      document.getElementById("navbarMobileMenu").style.display = "block";
    } else {
      document.getElementById("navbarMobileMenu").style.display = "none";
    }
    e.stopPropagation();
  }
  const subMenuOperations = (e) => {
    e.preventDefault();
    setOpenSubMenue(!openSubMenue);
    console.log('subMenuOperations clicked');
    e.stopPropagation();
  }
  return (
    <header className="header-navbar">    <div className="container-fluid">
      <div className="head">
        <div className="row row-flex d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
          <div className="col-xl-3 col-8">
            <div id="logo" className="mb-3"><a href="https://caizcoin.com/" aria-label="CAIZCOIN" className="d-flex align-items-center col-md-10 mb-2 mb-md-0 text-dark text-decoration-none">
              <img src={Logo_caiz_new} alt="CAIZCOIN" width="275" height="53" />
            </a></div>
          </div>
          <div className="col-xl-9 col-4">
            <div className={openMenue ? "navbarBtn  open" : 'navbarBtn'} onClick={setOpenMenue2}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div id="navbarMobileMenu" className="menu">
            <ul>
                <li><a href="https://caizcoin.com/ecosystem.html/" title="Ecosystem"><span className="cool-mainlink">Ecosystem</span></a></li>
                <li id="navbarMobileSubMenu" className={openSubMenue ? "opens  open" : 'opens'} ><a href="#!" onClick={subMenuOperations}>
                  <span className="cool-mainlink"  title="Learn Caiz">Learn Caiz</span></a>
                  <div className="submenu-main">
                    <div className="row">
                      <div className="col-xl-4 col-md-6 sub-col-rb">
                        <ul>
                          <li><a href="https://caiz.com"><span className="cool-link-menu" title="Caiz Coin"><FontAwesomeIcon icon={faCoins} className="icon-style" />Caizcoin</span></a></li>
                          <li><a href="https://caiz.com/caiz-earn/"><span className="cool-link-menu" title="Caiz Earn"><FontAwesomeIcon icon={faHandHoldingDollar} className="icon-style"/>Caiz Earn</span></a></li>
                          <li> <a href="https://caiz.com/tokenomics/"><span className="cool-link-menu" title="Tokenomics"><FontAwesomeIcon icon={faChartPie} className="icon-style"/>Tokenomics</span></a></li>
                          <li> <a href="https://caiz.com/circulating-supply/"> <span className="cool-link-menu" title="Circulating supply<"><FontAwesomeIcon icon={faChartSimple} className="icon-style"/>Circulating supply</span></a></li>                        
                          </ul>
                      </div>
                      <div className="col-xl-4 col-md-6 sub-col-rb">
                        <ul>
                        <li><a href="https://caiz.com/sharia-certificates/"><span className="cool-link-menu" title="Sharia Certificates"><FontAwesomeIcon icon={faFileCircleCheck} className="icon-style"/>Sharia Certificates</span> </a></li>
                        <li><a href="https://caiz.com/roadmap/"><span className="cool-link-menu" title="Roadmap"><FontAwesomeIcon icon={faMap} className="icon-style"/>Roadmap</span></a></li>
                        <li><a href="https://caiz.com/caiz-team/"><span className="cool-link-menu" title="Caiz Team"><FontAwesomeIcon icon={faUser} className="icon-style"/>Caiz Team</span></a></li>
                        <li><a href="https://caiz.com/ambassadors/"><span className="cool-link-menu" title="Ambassadors"><FontAwesomeIcon icon={faUsers} className="icon-style"/>Ambassadors</span></a></li>
                        </ul>
                      </div>
                      <div className="col-xl-4 col-md-6">
                        <ul>
                        <li><a href="https://caiz.com/events2024/"><span className="cool-link-menu" title="Events 2024"><FontAwesomeIcon icon={faCalendarDays} className="icon-style"/>Events2024</span></a></li>
                        <li><a href="https://caiz.com/partnerships/"><span className="cool-link-menu" title="Partnerships"><FontAwesomeIcon icon={faHandshake} className="icon-style"/>Partnerships</span></a></li>
                        <li><a href="https://caiz.com/caiz-sponsorships/"><span className="cool-link-menu" title="Caiz Sponserships"><FontAwesomeIcon icon={faStar} className="icon-style"/>Caiz Sponserships</span></a></li>
                        <li> <a href="https://caiz.com/caiz-relief/" target="_blank"><span class="cool-link-menu" title="Caiz Relief"><FontAwesomeIcon icon={faHeart} className="icon-style"/>Caiz Relief</span></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                <li id="navbarMobileSubMenu" className={openSubMenue ? "opens  open" : 'opens'} ><a href="#!" onClick={subMenuOperations}>
                  <span className="cool-mainlink"  title="Cooperations">Cooperations</span></a>
                  <div className="submenu">
                    <div className="row">
                      <div className="col-xl-4 col-md-6 sub-col-rb">
                        <ul>
                        <li><a href="https://caiz.com/developer-cooperations-program/"><span className="cool-link" title="Developer Cooperation"><FontAwesomeIcon icon={faLaptopCode} className="icon-style"/>Developer Cooperation</span></a></li>
                        <li><a href="https://caiz.com/marketing-cooperations-program/"><span className="cool-link" title="Marketing Cooperations"><FontAwesomeIcon icon={faBullhorn} className="icon-style"/>Marketing Cooperations</span></a></li>
                        <li> <a href="https://caiz.com/become-an-advocate/"><span className="cool-link" title="Become an Advocate<"><FontAwesomeIcon icon={faPersonWalkingLuggage} className="icon-style"/>Become an Advocate</span></a></li>
                        <li> <a href="https://caiz.com/freelance-with-caiz/"> <span className="cool-link" title="Freelance with Caiz"><FontAwesomeIcon icon={faPeopleGroup} className="icon-style"/>Freelance with Caiz</span></a></li>
                        <li> <a href="https://caiz.com/influencers/"> <span className="cool-link" title="Influencers"><FontAwesomeIcon icon={faHashtag} className="icon-style"/>Influencers</span></a></li>
                        <li> <a href="https://caiz.com/caizcoin-bounty-program//"> <span className="cool-link" title="Bounty Program"><FontAwesomeIcon icon={faSackDollar} className="icon-style"/>Bounty Program</span></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>                

                <li id="navbarMobileSubMenu" className={openSubMenue ? "opens  open" : 'opens'} ><a href="#!" onClick={subMenuOperations}>
                  <span className="cool-mainlink" title="Legal & Security">Legal & Security</span></a>
                  <div className="submenu">
                      <div className="col-xl-4 col-md-6 sub-col-rb">
                        <ul>
                          <li><a href="https://caiz.com/security-on-caiz/"><span className="cool-link" title="Security on Caiz"><FontAwesomeIcon icon={faLock} className="icon-style"/>Security on Caiz</span></a></li>
                          <li><a href="https://caiz.com/law-reinforcement/"><span className="cool-link" title="Law reinforcement"><FontAwesomeIcon icon={faBriefcase} className="icon-style"/>Law reinforcement</span></a></li>
                          <li> <a href="https://caiz.com/legal-courts/"><span className="cool-link" title="Legal Courts"><FontAwesomeIcon icon={faGavel} className="icon-style"/>Legal Courts</span></a></li>
                          <li> <a href="https://caiz.com/risk-warning/"> <span className="cool-link" title="Risk Warning"><FontAwesomeIcon icon={faExclamationTriangle} className="icon-style"/>Risk Warning</span></a></li>
                        </ul>
                    </div>
                  </div>
                </li>                

                <li id="navbarMobileSubMenu" className={openSubMenue ? "opens  open" : 'opens'} ><a href="#!" onClick={subMenuOperations}>
                  <span className="cool-mainlink" title="Communication">Communication</span></a>
                  <div className="submenu">
                    <div className="row">
                      <div className="col-xl-4 col-md-6 sub-col-rb">
                        <ul>
                          <li><a href="https://caiz.com/community/"><span className="cool-link" title="Community"><FontAwesomeIcon icon={faUsers} className="icon-style"/>Community</span></a></li>
                          <li><a href="https://caiz.com/institutional-contacts/"><span className="cool-link" title="Institutional Contacts"><FontAwesomeIcon icon={faBuilding} className="icon-style"/>Institutional Contacts</span></a></li>
                          <li> <a href="https://caiz.com/press-and-media-inquiries/"><span className="cool-link" title="Press and Media Inquires"><FontAwesomeIcon icon={faNewspaper} className="icon-style"/>Press and Media Inquires</span></a></li>
                          <li> <a href="https://caiz.com/downloads/"> <span className="cool-link" title="Downloads"><FontAwesomeIcon icon={faDownload} className="icon-style"/>Downloads</span></a></li>
                          <li> <a href="https://caiz.com/wordings/"> <span className="cool-link" title="Wordings"><FontAwesomeIcon icon={faFileWord} className="icon-style"/>Wordings</span></a></li>
                          <li> <a href="https://caiz.com/feedback/"> <span className="cool-link" title="Feedback"><FontAwesomeIcon icon={faComments} className="icon-style"/>Feedback</span></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>                

                <li id="navbarMobileSubMenu" className={openSubMenue ? "opens  open" : 'opens'} ><a href="#!" onClick={subMenuOperations}>
                  <span className="cool-mainlink" title="Contact">Contact</span></a>
                  <div className="submenu">
                    <div className="row">
                      <div className="col-xl-4 col-md-6 sub-col-rb">
                        <ul>
                          <li><a href="https://caiz.com/contact-us/"><span className="cool-link" title="Contact us"><FontAwesomeIcon icon={faEnvelope} className="icon-style"/>Contact us</span></a></li>
                          <li><a href="https://caiz.com/become-a-partner/"><span className="cool-link" title="Become a partner"><FontAwesomeIcon icon={faHandshake} className="icon-style"/>Become a partner</span></a></li>
                          <li> <a href="https://caizcareers.com/"><span className="cool-link" title="We're Hiring"><FontAwesomeIcon icon={faPaste} className="icon-style"/>We're Hiring</span></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul> 
              <div className="header_social_media_icons">
                <div className="row menu_container submenu-container">
                  <div className="col-12">
                    <div className="sosyal_medya text-center">
                      <nav>
                        <a rel="noopener" href="https://www.reddit.com/r/Caizcoin/" target="_blank">

                          <img src={reddit} className="lazy" alt="reddit" width="35" height="35" />

                        </a><a rel="noopener" href="https://twitter.com/caizcoin" target="_blank">


                          <img src={twitter} className="lazy" alt="twitter" width="35" height="35" />

                        </a><a rel="noopener" href="https://www.instagram.com/caizcoin/" target="_blank">

                          <img src={instagram} className="lazy" alt="instagram" width="35" height="35" />

                        </a><a rel="noopener" href="https://www.facebook.com/Caizcoin/" target="_blank">

                          <img src={facebook} className="lazy" alt="facebook" width="35" />
                        </a><a rel="noopener" href="https://www.youtube.com/channel/UCiUX3Q8oga8cQRp7foeuR4A" target="_blank">

                          <img src={youtube} className="lazy" alt="youtube" width="35" height="35" />

                        </a><a rel="noopener" href="https://caizcoin.medium.com/" target="_blank">

                          <img src={medium} className="lazy" alt="medium" width="35" height="35" />
                        </a><a rel="noopener" href="https://www.linkedin.com/company/caizcoin/" target="_blank">


                          <img src={linkedln} className="lazy" alt="linkedin" width="35" height="35" />
                        </a><a rel="noopener" href="https://www.tiktok.com/@caizcoin" target="_blank">

                          <img src={tiktok} className="lazy" alt="tiktok" width="35" height="35" />
                        </a>
                        <a rel="noopener" href="https://t.me/caizcoin_official" target="_blank">

                          <img src={telegram} className="lazy" alt="pinterest" width="35" height="35" />

                        </a>

                        <a rel="noopener" href="https://discord.gg/J8c8A5zst2" target="_blank">

                          <img src={discord} className="lazy" alt="discord" width="35" height="35" />
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></header>

  );
};

export default Navbar;
