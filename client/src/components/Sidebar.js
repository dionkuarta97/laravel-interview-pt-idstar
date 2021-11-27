import { useState } from "react";
import { Navbar, Card, Col, Button, Row } from "react-bootstrap";
import { BsList, BsX, BsHouseFill, BsArrowReturnRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLogin } from "../store/actions";
function Sidebar(props) {
  const { handleCol } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(setLogin(false));
    navigate("/login");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          {!show ? (
            <>
              <Button
                variant="link"
                style={{ color: "white" }}
                onClick={() => {
                  setShow(true);
                  handleCol(true);
                }}
              >
                <BsList size={20} />
              </Button>{" "}
              Documents
            </>
          ) : (
            <>
              <Button
                variant="link"
                style={{ color: "white" }}
                onClick={() => {
                  setShow(false);
                  handleCol(false);
                }}
              >
                <BsX size={20} />
              </Button>{" "}
              Documents
            </>
          )}
        </Navbar.Brand>
      </Navbar>

      {show ? (
        <Col xs={12} md={2} lg={2} className="p-0" flex>
          <Card className="bg-dark" style={{ borderRadius: 0, height: "120%" }}>
            <Card.Body>
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <div className="d-grid gap-2">
                    <Button className="mb-1" onClick={() => navigate("/")} variant={location.pathname === "/" ? "info" : "outline-info"} style={{ textAlign: "left" }}>
                      <BsHouseFill /> Home
                    </Button>
                  </div>
                </Col>
                <Col xs={12} md={12} lg={12}>
                  <div className="d-grid gap-2">
                    <Button className="mb-1" onClick={handleLogout} variant="outline-info" style={{ textAlign: "left" }}>
                      <BsArrowReturnRight /> Logout
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ) : (
        ""
      )}
    </>
  );
}

export default Sidebar;
