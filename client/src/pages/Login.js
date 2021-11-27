import { useEffect, useState } from "react";
import { Container, Card, Col, Button, FormControl, InputGroup } from "react-bootstrap";
import { BsFillPersonFill, BsFillKeyFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { alertError, alertSuccess } from "../assets/js/sweetalert2";
import { login, setErrorMessage, setSuccessMessage } from "../store/actions";
function Login() {
  const [data, setData] = useState({});
  const { errorMessage } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleClick = () => {
    dispatch(login(data));

    navigate("/");
  };

  return (
    <>
      <Container>
        <Col
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "5%",
            marginBottom: "10%",
          }}
          xs={12}
          md={6}
          lg={6}
        >
          <div align="center" className="mb-3">
            <h3>L O G I N</h3>
          </div>
          <Card>
            <Card.Img variant="top" src="http://www.pegipegi.com/travel/wp-content/uploads/2014/04/Foto-4-Pemandangan-Malam-Indah.jpg" />
            <Card.Body>
              <div align="center">
                <Col md={6} lg={6} xs={8}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <BsFillPersonFill />
                    </InputGroup.Text>
                    <FormControl placeholder="username" name="username" onChange={handleChange} aria-label="username" aria-describedby="basic-addon1" />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">
                      <BsFillKeyFill />
                    </InputGroup.Text>
                    <FormControl placeholder="password" type="password" name="password" onChange={handleChange} aria-label="password" aria-describedby="basic-addon2" />
                  </InputGroup>
                  <Button variant="primary" onClick={handleClick}>
                    Login
                  </Button>
                </Col>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
}

export default Login;
