import { Box, Button, Grid, Modal } from "@mui/material";
import React, { useState, useEffect, useReducer } from "react";
import { IUser, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import axios from "axios";
import { app } from "../../../components/constants";
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../components/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { Settings } from "@mui/icons-material";
import Confirmation from "../../../components/controllers/confirmation";
import FullPageLoader from "../../../components/full-page-loader";

interface IChildModalProps {
  showChildModal: boolean;
  setShowChildModal: any;
  rejectReason: string;
  setRejectReason: any;
  setShowRejectAlert: any;
}
function ChildModal({
  showChildModal,
  setShowChildModal,
  rejectReason,
  setRejectReason,
  setShowRejectAlert,
}: IChildModalProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <React.Fragment>
      <Modal
        open={showChildModal}
        onClose={() => setShowChildModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 350 }}>
          <h2 id="child-modal-title">UnVerify Reason</h2>
          <small>
            This will help the user to know why he/she is account was not
            verified
          </small>
          <p id="child-modal-description">
            <textarea
              className="form-control"
              placeholder="Please enter your comment. ex: invalid document"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </p>
          <button
            className="btn btn-danger"
            onClick={() => setShowRejectAlert(true)}
          >
            Disapprove
          </button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);
  const [users, setUsers] = useState<IUser[]>([]);

  const [showChildModal, setShowChildModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IUser | undefined>(
    undefined
  );

  const [showApproveAlert, setShowApproveAlert] = useState(false);
  const [showRejectAlert, setShowRejectAlert] = useState(false);

  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = () => {
    setShowApproveAlert(false);
    setShowModal(false);
    setIsLoading(true);
    axios
      .put(app.BACKEND_URL + "/users/approve", selectedItem, setHeaders(token))
      .then((res) => {
        setIsLoading(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.responseMessage);
        //update user
        const index = users.findIndex((item) => item._id === selectedItem?._id);
        if (index !== -1) {
          const newState = users;
          newState[index] = res.data.user;
          setUsers(newState);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };
  const handleReject = () => {
    if (rejectReason.trim() === "") {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        "Please give feedback to the user."
      );
      return;
    }

    setShowRejectAlert(false);
    setShowChildModal(false);
    setShowModal(false);
    setIsLoading(true);
    axios
      .put(
        app.BACKEND_URL + "/users/disapprove",
        { ...selectedItem, verificationMessage: rejectReason },
        setHeaders(token)
      )
      .then((res) => {
        setIsLoading(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.responseMessage);
        //update user
        const index = users.findIndex(
          (item) => item._id === selectedItem?.verificationMessage
        );
        if (index !== -1) {
          const newState = users;
          newState[index] = res.data.user;
          setUsers(newState);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(app.BACKEND_URL + "/users/all", setHeaders(token))
      .then((res) => {
        setIsLoading(false);
        setUsers(res.data.users);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item md={12}>
          <h2>Registered Users</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <th>#</th>
                <th>Names</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Dob</th>
                <th>Nationality</th>
                <th>Marital Status</th>
                <th>verificationStatus</th>
                <th>ID/Passport</th>
                <th className="text-center">Action</th>
              </thead>
              <tbody style={{ borderTopWidth: 0 }}>
                {users.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {item.fName} {item.lName}
                    </td>
                    <td>{item.gender}</td>
                    <td>{item.age}</td>
                    <td>{item.dob}</td>
                    <td>{item.nationality}</td>
                    <td>{item.maritalStatus}</td>
                    <td>{item.verificationStatus}</td>
                    <td>
                      {item.identificationNumber}
                      <p className="m-0">
                        <a
                          href={app.FILE_URL + item.identificationDocument}
                          target="_blank"
                        >
                          View Document
                        </a>
                      </p>
                    </td>
                    <td className="text-center">
                      <span
                        title="Approve or reject"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setRejectReason("");
                          setSelectedItem(item);
                          setShowModal(true);
                        }}
                      >
                        <Settings color="primary" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Virify {selectedItem?.fName}</h2>
          <p id="parent-modal-description">
            <button
              className="btn common-btn d-block"
              onClick={() => setShowApproveAlert(true)}
            >
              Approve Verification
            </button>
            <button
              className="btn btn-danger mt-3"
              onClick={() => setShowChildModal(true)}
            >
              Disapprove Verification
            </button>
          </p>
          <ChildModal
            setRejectReason={setRejectReason}
            rejectReason={rejectReason}
            showChildModal={showChildModal}
            setShowChildModal={setShowChildModal}
            setShowRejectAlert={setShowRejectAlert}
          />
        </Box>
      </Modal>
      <Confirmation
        title={`Do you want to approve ${selectedItem?.fName} <${selectedItem?.email}>`}
        setShowAlert={setShowApproveAlert}
        showAlert={showApproveAlert}
        callback={handleApprove}
      />
      <Confirmation
        title={`Do you want to disapprove ${selectedItem?.fName} <${selectedItem?.email}>`}
        setShowAlert={setShowRejectAlert}
        showAlert={showRejectAlert}
        callback={handleReject}
      />
      <FullPageLoader open={isLoading} />
    </>
  );
}

export default Admin;
