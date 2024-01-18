import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home";
import EarnForm from "./components/form-screen";
import FormLayout from "./components/layout/form-layout";
import Dashboard from "./components/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isMobile } from "react-device-detect";

import "./App.scss";
import MobileRestriction from "./components/mobile-restrictions-modal";
import Modal from "react-modal";
import { useEffect, useState } from "react";

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(true);
    }
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent'
    },
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
    <div className="App">
      {isMobile ? (
        <Layout>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="mobile restrinction Modal"
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}>
            <MobileRestriction />
          </Modal>
        </Layout>
      ) : (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/form"
              element={
                <FormLayout>
                  <EarnForm />
                </FormLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <FormLayout>
                  <Dashboard />
                </FormLayout>
              }
            />
          </Routes>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
