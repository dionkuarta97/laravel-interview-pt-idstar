import { Badge, Button } from "react-bootstrap";
import ModalDetail from "./ModalDetail";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteDocument } from "../store/actions";
import { alertSure } from "../assets/js/sweetalert2";
import ModalApprove from "./ModalApprove";
import ModalReject from "./ModalReject";
import ModalRemark from "./ModalRemark";

function TableDocuments(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { data, currentPage } = props;

  const handleDelete = async (id) => {
    const result = await alertSure();
    if (result.value) {
      dispatch(deleteDocument(id));
    }
  };
  return (
    <>
      <table className="table table-hover text-nowrap" style={{ color: "#67595e" }}>
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Document Subject</th>
            <th scope="col">Status</th>
            <th scope="col">Created By</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((e, idx) => (
            <tr key={e.document_no}>
              <td>{currentPage * 10 + idx + 1 - 10}</td>
              <td>{e.document_subject}</td>
              <td>
                {" "}
                {user?.role === "maker" ? (
                  <Badge bg={e.status === "Approve" ? "success" : e.status === "Reject" ? "danger" : "secondary"}>{e.status}</Badge>
                ) : e.status === "On Progress" ? (
                  <>
                    <ModalApprove status="Approve" id={e.document_no} /> <ModalReject status="Reject" id={e.document_no} />
                  </>
                ) : (
                  <Badge bg={e.status === "Approve" ? "success" : e.status === "Reject" ? "danger" : ""}>{e.status}</Badge>
                )}
              </td>
              <td>{e.user.username}</td>
              <td>
                <ModalDetail nasabah={e.document_detail} /> {e.status !== "On Progress" ? <ModalRemark remark={e.remark} /> : " "}{" "}
                {user?.role === "maker" ? (
                  <Button onClick={() => handleDelete(e.document_no)} variant="outline-danger">
                    <BsTrash />
                  </Button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableDocuments;
