import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function StickyHeader() {
  return (
    <>
      <Navbar
        bg="light"
        style={{
          width: "85%",
          margin: "50px auto 0",
          borderRadius: "10px",
          padding: "15px",
          boxShadow:
            "0px 2px 4px rgba(0, 0, 0, 0.4), inset 0px 2px 4px rgba(0, 0, 0, 0.4)",
        }}>
        <Container>
          <Navbar.Brand href="#home">
            <h1 className="Navname">Aromatic Bar</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default StickyHeader;
