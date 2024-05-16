import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { TiDocumentDelete } from "react-icons/ti";
import { VscRefresh } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";

function Submission() {
  const [allEntries, setAllEntries] = useState(
    JSON.parse(localStorage.getItem("allEntries")) || []
  );
  const [displayDetail, setDisplay] = useState(false);
  const [singleEntry, setSingleEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (!path.includes("submission")) {
      setDisplay(true);
      const id = path.split("/").pop();
      const entry = allEntries.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      setSingleEntry(entry);
    }
  }, [allEntries]);

  const handleCheckVal = (ty, entry) => {
    const val = entry.checkbox_values.find((item) => item.split("_")[0] === ty);
    return val ? val.split("_")[1] : "";
  };

  const deleteEntry = (id) => {
    const updatedEntries = allEntries.filter((entry) => entry.id !== id);
    setAllEntries(updatedEntries);
    localStorage.setItem("allEntries", JSON.stringify(updatedEntries));
  };

  const singleEntryForm = () => {
    return (
      <Container className="SubmissionContainer">
        <Card>
          <Card.Header>
            <cite title="Source Title">Feedback Details</cite>
          </Card.Header>
          <Card.Body>
            {singleEntry &&
              Object.keys(feedback_type).map((ty) => (
                <Row key={ty}>
                  <Col>{feedback_type[ty]}</Col>
                  <Col>{handleCheckVal(ty, singleEntry)}</Col>
                </Row>
              ))}
          </Card.Body>
        </Card>
      </Container>
    );
  };

  const feedback_type = {
    qos: "Please rate the quality of the service you received from your host.",
    qob: "Please rate the quality of your beverage.",
    roc: "Was our restaurant clean?",
    exp: "Please rate your overall dining experience.",
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const refreshPage1 = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="search-refresh">
        <Form>
          <Form.Group className="searcH" controlId="formSearch">
            <CiSearch className="search-icon" />
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </Form>

        <Button
          variant="secondary"
          className="mr-2"
          style={{ background: "green" }}>
          Add New
        </Button>

        <VscRefresh
          className="Refresh"
          variant="secondary"
          onClick={refreshPage1}
        />
      </div>
      {displayDetail ? (
        singleEntryForm()
      ) : (
        <div className="padding30px">
          <div style={{ marginBottom: "10px" }}>
            <span
              style={{
                fontSize: "14px",
                position: "relative",
                right: "685px",
                marginBottom: "30px",
              }}>
              {allEntries.length}{" "}
              {allEntries.length === 1 ? "record found" : "records found"}
            </span>
          </div>
          <Table striped bordered hover responsive>
            <thead style={{ fontWeight: "bold", fontSize: "13px" }}>
              <tr>
                <th
                  style={{
                    backgroundColor: "#5700a14f",
                    color: "rgba(0, 0, 0, 0.750)",
                  }}>
                  Form Details
                </th>
                <th
                  style={{
                    backgroundColor: "#5700a14f",
                    color: "rgba(0, 0, 0, 0.750)",
                  }}>
                  Customer Name
                </th>
                <th
                  style={{
                    backgroundColor: "#5700a14f",
                    color: "rgba(0, 0, 0, 0.750)",
                  }}>
                  Email
                </th>
                <th
                  style={{
                    backgroundColor: "#5700a14f",
                    color: "rgba(0, 0, 0, 0.750)",
                  }}>
                  Phone
                </th>
                {Object.keys(feedback_type).map((ty) => (
                  <th
                    key={ty}
                    style={{
                      backgroundColor: "#5700a14f",
                      color: "rgba(0, 0, 0, 0.750)",
                    }}>
                    {feedback_type[ty]}
                  </th>
                ))}
                <th
                  style={{
                    backgroundColor: "#5700a14f",
                    color: "rgba(0, 0, 0, 0.750)",
                  }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "14px" }}>
              {allEntries
                .filter((entry) =>
                  entry.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((entry) => (
                  <tr key={entry.id} style={{ lineHeight: "1.6" }}>
                    <td>
                      <a
                        className="viewDetailes"
                        href={`/submission/${entry.id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        View Details
                      </a>
                    </td>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.phone}</td>

                    {Object.keys(feedback_type).map((ty) => (
                      <td key={ty}>{handleCheckVal(ty, entry)}</td>
                    ))}
                    <td>
                      <TiDocumentDelete
                        className="deletIcon"
                        onClick={() => deleteEntry(entry.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Submission;
