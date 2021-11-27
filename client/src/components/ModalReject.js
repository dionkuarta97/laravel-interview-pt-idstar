import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { alertSure } from "../assets/js/sweetalert2";
import { updateDocumet } from "../store/actions";

function ModalReject(props) {
  const dispatch = useDispatch();
  const { status, id } = props;
  const [show, setShow] = useState(false);
  const [remark, setRemark] = useState("");
  const handleClose = () => {
    setShow(false);
    setRemark("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setRemark(value);
  };

  const handleShow = () => {
    setShow(true);
    setRemark("");
  };

  const handleClick = async () => {
    const payload = {
      id: id,
      status: status,
      remark: remark,
    };
    setShow(false);
    setRemark("");
    const result = await alertSure();
    if (result.value) {
      dispatch(updateDocumet(payload));
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="danger">
        Reject
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Remark</label>
            <input name="remark" onChange={handleChange} className="form-control" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClick}>
            Save
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalReject;
