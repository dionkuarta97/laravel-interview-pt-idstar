import { Button, ListGroup, Modal, Col } from "react-bootstrap";
import { useState } from "react";

function ModalDetail(props) {
  const { nasabah } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button onClick={handleShow} variant="outline-info">
        Detail Document
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup as="ol" numbered>
            {nasabah?.map((el) => (
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={el.id}>
                <div className="ms-2 me-auto">
                  <Col xm={3} md={6}>
                    <div className="fw-bold">{el.nama_nasabah}</div>
                  </Col>
                  <div className="fw-bold">{el.amount}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDetail;
