import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { Container, Row, Col, Nav, Card, Pagination, Spinner, InputGroup, FormControl, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getDocuments } from "../store/actions";
import TableDocuments from "../components/TableDocuments";

import { BsSearch } from "react-icons/bs";
import ModalAdd from "../components/ModalAdd";

function Home() {
  const dispatch = useDispatch();
  const { user, documents, loading } = useSelector((state) => state);
  console.log(documents);
  const [payload, setPayload] = useState({
    status: "On Progress",
  });
  const [currentPage, setCurentPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleCol = (val) => {
    setShow(val);
  };

  useEffect(() => {
    dispatch(getDocuments(payload));
  }, []);
  const handleStatus = (e, val) => {
    e.preventDefault();
    setPayload({ status: val });
    dispatch(getDocuments({ ...payload, status: val }));
  };

  const handlePage = (val) => {
    setPayload({ ...payload, page: val });
    setCurentPage(val);
    dispatch(getDocuments({ ...payload, page: val }));
  };

  const handleSearch = () => {
    dispatch(getDocuments(payload));
  };
  const searchChange = (e) => {
    const value = e.target.value;
    setPayload({ ...payload, subject: value });
  };

  const pagination = () => {
    let items = [];
    for (let i = 1; i <= documents?.totalPage; i++) {
      items.push(
        <Pagination.Item onClick={() => handlePage(i)} key={i} active={i === currentPage}>
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <Container style={{ height: "100%" }} fluid>
        <Row style={{ height: "100%" }}>
          <Sidebar handleCol={handleCol} />
          <Col xs={12} style={{ height: "100%" }} md={!show ? 12 : 10} lg={!show ? 12 : 10}>
            <Container style={{ height: "100%" }} className="mt-3 mb-3">
              <h1>Home</h1>
              {loading ? (
                <div>
                  <Spinner animation="grow" variant="primary" />
                  <Spinner animation="grow" variant="secondary" />
                  <Spinner animation="grow" variant="success" />
                  <Spinner animation="grow" variant="danger" />
                  <Spinner animation="grow" variant="warning" />
                  <Spinner animation="grow" variant="info" />
                  <Spinner animation="grow" variant="light" />
                  <Spinner animation="grow" variant="dark" />
                </div>
              ) : (
                ""
              )}
              <Card className="mb-3">
                <Card.Header>
                  <Nav variant="pills" defaultActiveKey="link-1">
                    <Nav.Item>
                      <Nav.Link onClick={(e) => handleStatus(e, "On Progress")} eventKey="link-1">
                        On Progress
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={(e) => handleStatus(e, "Approve")} eventKey="link-2">
                        Approve
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={(e) => handleStatus(e, "Reject")} eventKey="link-3">
                        Reject
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <div className="card-body table-responsive ">
                  <Row>
                    <Col xs={12} md={4} xl={4}>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <BsSearch />
                        </InputGroup.Text>
                        <FormControl placeholder="search e.g :subject" onChange={searchChange} name="subject" aria-label="search e.g :subject" aria-describedby="basic-addon1" />
                      </InputGroup>
                    </Col>
                    <Col xs={12} md={4} xl={4}>
                      <Button onClick={handleSearch} variant="success">
                        Search
                      </Button>
                    </Col>
                  </Row>
                  {user.role === "maker" ? <ModalAdd /> : ""}
                  <TableDocuments data={documents?.data} currentPage={currentPage} />
                </div>
                <Card.Footer>
                  <Pagination>{pagination()}</Pagination>
                </Card.Footer>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
