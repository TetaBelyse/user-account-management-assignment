import { Grid } from "@mui/material";
import React, { useState, useEffect, useReducer } from "react";
import { IUser } from "../../../interfaces";
import axios from "axios";
import { app } from "../../../components/constants";
import { errorHandler, setHeaders } from "../../../components/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);
  const [users, setUsers] = useState<IUser[]>([]);

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
  return (
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
                  <td className="text-center">Action</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Grid>
    </Grid>
  );
}

export default Admin;
