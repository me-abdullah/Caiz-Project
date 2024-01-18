import React from "react";
import Footer from "../footer";
import Navbar from "../navbar/navbar";

import "./layout.scss";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className=" bg-Layout  img-fluide">
        <div className=" ">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
