import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import { appColors } from "../../../components/constants";
import { Dashboard, Key, Logout } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { USER_ROLE_ENUM } from "../../../interfaces";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confirmation from "../../../components/controllers/confirmation";

function Sidebar() {
  const { role } = useSelector((state: RootState) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setShowAlert(false);
    navigate("/logout");
  };
  return (
    <div>
      <Toolbar style={{ backgroundColor: appColors.DARK_GREEN }}>
        <img src={require("../../../assets/logo.png")} />
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        {/* {role === USER_ROLE_ENUM.USER && (
          <ListItem disablePadding onClick={() => navigate("/dashboard")}>
            <ListItemButton>
              <ListItemIcon>
                <Key />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </ListItem>
        )} */}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => setShowAlert(true)}>
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      <Confirmation
        callback={handleLogout}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        title="Do you want to logout?"
      />
    </div>
  );
}

export default Sidebar;
