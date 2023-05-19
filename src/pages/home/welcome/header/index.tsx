import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../reducers";
import { Container } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.user);
  return (
    <div className="app-header">
      <Container>
        <div className="main-container">
          <div className="logo-container">
            <img src={require("../../../../assets/logo.png")} />
            <h1>UAM</h1>
          </div>
          <div className="header-menu">
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              {token.trim() === "" ? (
                <>
                  <li onClick={() => navigate("/login")}>Login</li>
                  <li>
                    <button onClick={() => navigate("/register")}>
                      Register
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                  <li onClick={() => navigate("/logout")}>Logout</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
