import React from "react";
import Header from "./header";
import "../../../scss/home.scss";
import { Col, Container, Row } from "react-bootstrap";

function Welcome() {
  return (
    <div
      className="welcome"
      style={{ backgroundImage: `url(${require("../../../assets/bg3.jpg")})` }}
    >
      <div className="cover">
        <Header />
        <Container>
          <div className="mt-5">
            <Row>
              <Col md={6}>
                <h3 className="mb-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum
                </p>
                <div className="buttons-container mt-5">
                  <button>Get Started</button>
                  <button>Learn More</button>
                </div>
              </Col>
              <Col md={6}></Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Welcome;
