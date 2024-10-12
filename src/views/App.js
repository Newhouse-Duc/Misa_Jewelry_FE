

import { Route, Routes } from "react-router-dom";

import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

import AppRoutes from "../routes/AppRoutes";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PrivateRoutes from "../routes/PrivateRoutes";
function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])
  return (
    <>
      <div>
        <Routes>
          <Route path="/admin/*" element={< PrivateRoutes />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        <ToastContainer />
      </div>
    </>

  );
}

export default App;
