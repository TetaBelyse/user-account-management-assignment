import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { AccountCircle, Verified } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import FullPageLoader from "../../../components/full-page-loader";
import axios from "axios";
import { app } from "../../../components/constants";
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../components/helpers";
import { TOAST_MESSAGE_TYPES } from "../../../interfaces";
import { fetUserStatus, setUser } from "../../../actions/user";

function User() {
  const dispatch = useDispatch();
  const userReducer = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const uploadImage = (image: any) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", image);
      axios
        .post(app.FILE_UPLOAD_URL as string, formData)
        .then((res) => {
          resolve({ fileName: res.data.fileName });
        })
        .catch((error) => {
          reject({
            message: "Failed to upload the document, please try again later",
          });
        });
    });
  };

  const handleFileUpload = async (image: any) => {
    setIsLoading(true);
    uploadImage(image)
      .then((res: any) => {
        const uploadedFile = res.fileName;
        axios
          .put(
            app.BACKEND_URL + "/users/profile/",
            {
              image: uploadedFile,
            },
            setHeaders(userReducer.token)
          )
          .then((res) => {
            setIsLoading(false);
            toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.responseMessage);
            dispatch(setUser({ ...userReducer, profilePhoto: uploadedFile }));
          })
          .catch((error) => {
            setIsLoading(false);
            errorHandler(error);
          });
      })
      .catch((error) => {
        setIsLoading(false);
        toastMessage(TOAST_MESSAGE_TYPES.ERROR, error.message);
      });
  };

  useEffect(() => {
    dispatch(fetUserStatus());
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Card>
            <CardHeader title="Account Verification" />
            <CardContent>
              <div className="flexCenter" style={{ flexDirection: "column" }}>
                <Verified color="success" />
                <p>{userReducer.verificationStatus}</p>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardHeader title="My Profile" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                  <p className="m-0">
                    <b>Names: </b>
                    {userReducer.fName} {userReducer.lName}
                  </p>
                  <p className="m-0">
                    <b>Email: </b>
                    {userReducer.email}
                  </p>
                  <p className="m-0">
                    <b>Age: </b>
                    {userReducer.age}
                  </p>
                  <p className="m-0">
                    <b>DOB: </b>
                    {userReducer.dob}
                  </p>
                  <p className="m-0">
                    <b>Martal Status: </b>
                    {userReducer.maritalStatus}
                  </p>
                  <p className="m-0">
                    <b>Nationality: </b>
                    {userReducer.nationality}
                  </p>
                  <p className="m-0">
                    <b>ID/Passport: </b>
                    {userReducer.identificationNumber}
                  </p>
                  {userReducer.identificationDocument.trim() !== "" && (
                    <a
                      target="_blank"
                      href={
                        process.env.REACT_APP_FILE_URL +
                        userReducer.identificationDocument
                      }
                    >
                      View ID/Passport Document uploaded
                    </a>
                  )}
                </Grid>
                <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                  <div
                    className="flexCenter"
                    style={{ flexDirection: "column" }}
                  >
                    {userReducer.profilePhoto.trim() === "" ? (
                      <AccountCircle style={{ fontSize: 100 }} />
                    ) : (
                      <img
                        src={app.FILE_URL + userReducer.profilePhoto}
                        style={{ width: 100, height: 100, borderRadius: 100 }}
                      />
                    )}
                    <br />
                    <input
                      type="file"
                      onChange={(t: any) => handleFileUpload(t.target.files[0])}
                      className="d-none"
                      ref={imageRef}
                    />
                    <button
                      className="btn common-btn mt-2"
                      onClick={() =>
                        imageRef.current && imageRef.current.click()
                      }
                    >
                      Update Photo
                    </button>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <FullPageLoader open={isLoading} />
    </div>
  );
}

export default User;
