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

function Sidebar() {
  const { role } = useSelector((state: RootState) => state.user);
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
        {role === USER_ROLE_ENUM.USER && (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Key />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
