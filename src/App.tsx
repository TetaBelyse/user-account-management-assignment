import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const RegisterSuccess = lazy(() => import("./pages/register-success"));
const Logout = lazy(() => import("./pages/logout"));

function Routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/success" element={<RegisterSuccess />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default Routing;
