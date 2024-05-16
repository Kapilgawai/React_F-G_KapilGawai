import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Alert from "react-bootstrap/Alert";

function FeedbackForm() {
  const [displayform, setDisplay] = useState(true);
  const [em_value, setEmValue] = useState("");
  const [nm_value, setNmValue] = useState("");
  const [ph_value, setPhValue] = useState();

  const [checked_val, setCheckBoxChecked] = useState([]);
  const [error_msg, setErrorMsg] = useState(
    "Please enter the value for the above field"
  );

  const handleOnChange = (isChecked, value) => {
    let temp = [...checked_val];
    var pre = value.split("_")[0];
    if (isChecked) {
      temp = temp.filter((item) => item.split("_")[0] !== pre);
      temp.push(value);
      setCheckBoxChecked(temp);
      return;
    }

    setCheckBoxChecked(temp.filter((item) => item !== value));
  };

  const validateForm = () => {
    setErrorMsg("Please enter the value for the above field");

    [...document.getElementsByClassName("alert-danger")].forEach((element) => {
      element.style.display = "none";
    });
    if (nm_value === "") {
      document.getElementById("name_er").style.display = "block";
    } else if (em_value === "") {
      document.getElementById("email_er").style.display = "block";
    } else if (!em_value.includes(".com") || !em_value.includes("@")) {
      document.getElementById("email_er").style.display = "block";
      setErrorMsg("Invalid Email");
    } else if (!ph_value) {
      document.getElementById("phone_er").style.display = "block";
    } else if (ph_value.length < 13) {
      document.getElementById("phone_er").style.display = "block";
      setErrorMsg("Invalid Phone number");
    } else if (checked_val.length < Object.keys(feedback_type).length) {
      let keys = Object.keys(feedback_type);
      checked_val.map((val) => {
        keys = keys.filter((item) => item !== val.split("_")[0]);
      });
      keys.map((val) => {
        document.getElementById("er_" + val).style.display = "block";
      });
    } else return true;
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      var existingEntries =
        JSON.parse(localStorage.getItem("allEntries")) || [];
      var new_id = 0;
      if (existingEntries == null || existingEntries.length === 0) {
        new_id = 1;
      } else {
        let lastentry = existingEntries.slice(-1)[0];
        new_id = parseInt(lastentry["id"]) + 1;
      }
      var entry = {
        id: new_id,
        email: em_value,
        name: nm_value,
        phone: ph_value,
        checkbox_values: checked_val,
      };

      existingEntries.push(entry);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      setDisplay(false);
    }
  };

  const feedback_type = {
    qos: "Please rate the quality of the service you received from your host.",
    qob: "Please rate the quality of your beverage.",
    roc: "Was our restaurant clean?",
    exp: "Please rate your overall dining experience.",
  };

  const feedback_opts = ["Excellent", "Good", "Fair", "Bad"];

  return (
    <Container>
      {displayform ? (
        <Card>
          <Container className="padding30px">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">
                      Customer Name
                    </Form.Label>
                    <Form.Control
                      className="formC"
                      type="text"
                      required
                      placeholder="E.g. jon snow"
                      value={nm_value}
                      onChange={(e) => setNmValue(e.target.value)}
                    />
                  </Form.Group>
                  <Alert variant="danger" id="name_er">
                    &#9432;{error_msg}
                  </Alert>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">
                      Email address
                    </Form.Label>
                    <Form.Control
                      className="formC"
                      type="email"
                      required
                      placeholder="E.g. abc@gmail.com"
                      value={em_value}
                      onChange={(e) => setEmValue(e.target.value)}
                    />
                  </Form.Group>
                  <Alert variant="danger" id="email_er">
                    &#9432;{error_msg}
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">Phone</Form.Label>
                    <InputGroup>
                      <PhoneInput
                        className="formC"
                        placeholder="9999999999"
                        value={ph_value}
                        onChange={setPhValue}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Alert variant="danger" id="phone_er">
                    &#9432;{error_msg}
                  </Alert>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                {Object.keys(feedback_type).map((ty) => (
                  <>
                    <Col key={ty}>
                      <Form.Group className="mb-3" controlId={ty}>
                        <Form.Label className="required-field">
                          {feedback_type[ty]}
                        </Form.Label>
                        <InputGroup>
                          <div className="mb-3">
                            {feedback_opts.map((opt, key) => (
                              <Form.Check
                                inline
                                key={key}
                                label={opt}
                                name={`${ty}_feedback_opts`}
                                id={`${ty}_${key}`}
                                checked={checked_val.includes(ty + "_" + opt)}
                                onChange={(e) =>
                                  handleOnChange(
                                    e.target.checked,
                                    ty + "_" + opt
                                  )
                                }
                                type="checkbox"
                                value={opt}
                              />
                            ))}
                          </div>
                        </InputGroup>
                      </Form.Group>
                      <Alert variant="danger" id={`er_${ty}`}>
                        &#9432;{error_msg}
                      </Alert>
                    </Col>
                    {ty === "qob" || ty === "exp" ? <Row /> : null}
                  </>
                ))}
              </Row>
            </Form>
          </Container>
        </Card>
      ) : (
        <Card bg="light" text="dark" className="thank-you-card">
          <Card.Body className="cardBody">
            <div className="padding30px">
              <div className="circle">
                <div className="checkmark"></div>
              </div>
            </div>
            <Card.Text className="thanks">
              Thank you for providing the feedback
            </Card.Text>
            <Form.Text muted className="thank2">
              We will work towards improving your experience
            </Form.Text>
            <div className="padding30px">
              <Button
                className="btn_Sub"
                onClick={() => (window.location.href = "/submission")}>
                Close
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
      {displayform && (
        <Button className="btn_purp" onClick={(e) => formSubmit(e)}>
          Submit Review
        </Button>
      )}
    </Container>
  );
}

export default FeedbackForm;
