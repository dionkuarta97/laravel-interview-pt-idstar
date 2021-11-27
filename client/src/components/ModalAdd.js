import { Button, Modal, Toast } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { alertSure } from "../assets/js/sweetalert2";
import { addDocument } from "../store/actions";

function ModalAdd() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [inputNasabah, setInputNasabah] = useState([]);
  const [nasabah, setNasabah] = useState([]);
  const [inpNasabah, setInpNasabah] = useState({});
  const [nama_nasabah, setNamaNasbah] = useState("");
  const [amount, setAmount] = useState(null);
  const [validate, setValidate] = useState({
    document_subject: false,
    nasabah: false,
  });

  const handleNamaNasabah = (e) => {
    const value = e.target.value;
    setNamaNasbah(value);
  };
  const handleAmountNasabah = (e) => {
    const value = e.target.value;
    setAmount(value);
  };
  const handleChange = (e) => {
    const value = e.target.value;

    if (!value) {
      setValidate({ ...validate, [e.target.name]: true });
    } else {
      setValidate({ ...validate, [e.target.name]: false });
    }

    setData({ ...data, [e.target.name]: value });
  };
  const handleClose = () => {
    setData({});
    setAmount(0);
    setNamaNasbah("");
    setNasabah([]);
    setShow(false);
    setInputNasabah([
      <>
        <label className="mb-2">Nama Nasabah</label>
        <input onChange={handleNamaNasabah} className="form-control" name="nama_nasabah" />
        <label className="mb-2">Amount</label>
        <input onChange={handleAmountNasabah} className="form-control" name="amount" type="number" />
      </>,
    ]);
    setData({});
    setValidate({ ...validate, document_subject: false });
  };

  const handleShow = () => {
    setData({});
    setAmount(0);
    setNamaNasbah("");
    setNasabah([]);
    setShow(true);
    setInputNasabah([
      <>
        <label className="mb-2">Nama Nasabah</label>
        <input onChange={handleNamaNasabah} className="form-control" name="nama_nasabah" />
        <label className="mb-2">Amount</label>
        <input onChange={handleAmountNasabah} className="form-control" name="amount" type="number" />
      </>,
    ]);
    setValidate({ ...validate, document_subject: false });
  };

  const toast = (show) => {
    return (
      <Toast className="mb-1" bg="danger" show={show}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">required</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
      </Toast>
    );
  };
  const addInput = () => {
    if (!nama_nasabah && !amount) {
      setValidate({ ...validate, nasabah: true });
    } else {
      setAmount(0);
      setNamaNasbah("");
      setValidate({ ...validate, nasabah: false });
      setNasabah([...nasabah, { nama_nasabah: nama_nasabah, amount: amount }]);
      setInputNasabah([
        ...inputNasabah,
        <>
          <label className="mb-2">Nama Nasabah</label>
          <input onChange={handleNamaNasabah} className="form-control" name="nama_nasabah" />
          <label className="mb-2">Amount</label>
          <input onChange={handleAmountNasabah} className="form-control" name="amount" type="number" />
        </>,
      ]);
    }
  };

  const handleSubmit = async (e) => {
    setAmount(0);
    setNamaNasbah("");
    if (!data["document_subject"]) {
      setValidate({ ...validate, document_subject: true });
    } else {
      setShow(false);
      setValidate({ ...validate, document_subject: false });
      const result = await alertSure();

      if (result.value) {
        setData({});
        setAmount(0);
        setNamaNasbah("");
        setNasabah([]);
        dispatch(addDocument({ document_subject: data.document_subject, nasabah: [...nasabah, { nama_nasabah: nama_nasabah, amount: amount }] }));
      }
    }
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        Add Document
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Modal.Title>Document</Modal.Title>
            <div className="form-group">
              <label className="mb-2">Document Subject</label>
              {toast(validate.document_subject)}
              <input className="form-control" onChange={handleChange} name="document_subject" />
              <Modal.Title className="mt-3">Nasabah</Modal.Title>
              {toast(validate.nasabah)}
              {inputNasabah}
              <Button className="mt-2" variant="outline-info" onClick={addInput}>
                Add Input
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAdd;
