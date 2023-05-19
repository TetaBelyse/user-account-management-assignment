import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { AccountCircle, ImageRounded } from "@mui/icons-material";

function User() {
  const userReducer = useSelector((state: RootState) => state.user);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Card>
            <CardHeader title="Account Verification" />
            <CardContent>testing</CardContent>
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
                  {userReducer.profilePhoto.trim() === "" ? (
                    <AccountCircle style={{ fontSize: 100 }} />
                  ) : (
                    <></>
                  )}
                  <br />
                  <button className="btn common-btn">Update Photo</button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default User;
