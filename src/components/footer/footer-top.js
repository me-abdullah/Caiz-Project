import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo_caiz_vertical_black from "../../assets/icons/logo_caiz_vertical_black.svg";

import "./footer-top.scss"

const FooterTop = () => {

  const [isSubmit, setIsSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
    }),
    onSubmit: (values, actions) => {
      const configuration = {
        method: "post",
        url: "https://api.caizcoin.com/api/v1/email/subscriber",
        data: {
          email: values.email,
        },
      };
      /*
      axios(configuration)
        .then((result) => {
          console.log(result);
          setIsSubmit(true);

        })
        .catch((error) => {
          console.log(error);
        });
        **/
      actions.resetForm();
    },
  });
  return (
    <div className="footer-top d-flex justify-content-center sub-menu">
      <div className="container-fluid ps-5 pe-5">
        <div className="row">
        <div className="col custom-col custom-card-col d-none d-xl-block">
        <div className="card custom-card">
                <img src={logo_caiz_vertical_black} alt="caiz logo" />
                <div className="card-body">
                    <p className="card-text foOpenSans">There are multiple interpretations for the word “Caiz”, it is defined as “Conforming with Islamic Ethics” for us.</p>
                </div>
            </div>
        </div>          
          <div className="col custom-col d-none d-xl-block">
            <div className="heads foInter">Company</div>
            <ul>
              <li>
                <a href="https://caizcoin.com/ecosystem/caiz-coin.html" target="_blank" className="primary-link foOpenSans">Caizcoin</a>
              </li>
              <li>
                <a href="https://caiz.com/caiz-team/" target="_blank" className="primary-link foOpenSans">Team</a>
              </li>
              <li>
                <a href="https://caiz.com/ambassadors/" target="_blank" className="primary-link foOpenSans">Ambassadors</a>
              </li>
              <li>
                <a href="https://caiz.com/brandkit/" target="_blank" className="primary-link foOpenSans">Brand kit</a>
              </li>
              <li>
                <a href="https://caiz.com/contact-us/" target="_blank" className="primary-link foOpenSans"> Contact us</a>
              </li>
              <li className="hiring"><a href="https://caizcareers.com/" target="_blank" className="primary-link foOpenSans">We’re hiring!</a></li>            
              </ul>
          </div>
          <div className="col custom-col d-none d-xl-block">
            <div className="heads foInter">Discover</div>
            <ul>
              <li>
                <a href="https://caiz.com/ecosystem/" target="_blank" className="primary-link foOpenSans">Ecosystem</a>
              </li>
              <li>
                <a href="https://caiz.com/tokenomics/" target="_blank" className="primary-link foOpenSans">Tokenomics</a>
              </li>
              <li>
                <a href="https://caiz.com/roadmap/" target="_blank" className="primary-link foOpenSans">Roadmap</a>
              </li>
              <li>
                <a href="https://caiz.com/caiz-relief/" target="_blank" className="primary-link foOpenSans">Caiz Relief</a>
              </li>
              <li>
                <a href="https://caiz.com/circulating-supply/" target="_blank" className="primary-link foOpenSans">Circulating supply</a>
              </li>
              <li>
                <a href="https://caiz.com/faq/" target="_blank" className="primary-link foOpenSans">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="col custom-col d-none d-xl-block">
            <div className="heads foInter">News</div>
            <ul>
              <li>
                <a href="https://caiz.com/awards/" target="_blank" className="primary-link foOpenSans">Awards</a>
              </li>
              <li>
                <a href="https://caiz.com/media-mentions/" target="_blank" className="primary-link foOpenSans">Media mentions</a>
              </li>
              <li>
                <a href="https://caiz.com/partnerships/" target="_blank" className="primary-link foOpenSans">Partnerships</a>
              </li>
              <li>
                <a href="https://caiz.com/become-a-partner/" target="_blank" className="primary-link foOpenSans">Become a partner</a>
              </li>
              <li>
                <a href="https://caiz.com/events/" target="_blank" className="primary-link foOpenSans">Events</a>
              </li>
              <li>
                <a href="https://caiz.com/press-and-media-inquiries/" target="_blank" className="primary-link foOpenSans">Press</a>
              </li>
            </ul>
          </div>
          <div className="col custom-col custom-news-col d-none d-xl-block">
            <div className="text-xl-start">
              <h3 className="d-flex p-0  justify-content-center justify-content-xl-start heads foInter">Newsletter</h3>

            </div>
            <form
              onSubmit={formik.handleSubmit}
            >

              <div id="subscribe-form-body" className="form-group">

                {(isSubmit) ? <label>Thanks for Subscribing</label> : <label>
                  <input
                    type="email"
                    className="subscribe-email"
                    name="email"
                    placeholder="Your email address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    disabled={isSubmit}
                  />
                </label>}
                <button className="btn subscribe-btn" type="submit" disabled={isSubmit}>
                {(isSubmit) ?'Your form is submitted':'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
