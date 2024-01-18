import React from "react";
import Footer from "../footer";
import Navbar from "../navbar/navbar";

import "./form-layout.scss";

const FormLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="bg-form-layout  img-fluide">
        <div className=" ">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default FormLayout;
