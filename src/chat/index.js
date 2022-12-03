import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../Firebase/config";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import { closeNav, openNav } from "../store/slice/authSlice";
import SideDrawer from "./SideDrawer";
import Grid from "@mui/material/Grid";
import UserProfileCart from "./UserProfileCart";
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import ChatFooter from "./ChatFooter";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const Index = () => {
  const auth = getAuth(firebaseApp);
  const isAuthed = auth.currentUser !== null;
  const navigate = useNavigate();
  const userState = useSelector((state) => state.chat.selectedUserData);

  const [open, setOpen] = React.useState(true);
  const navState = useSelector((state) => state.nav.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthed) {
      navigate("/login");
    }
  }, [auth]);

  useEffect(() => {
    if (navState) {
      handleDrawerOpen();
    } else {
      handleDrawerClose();
    }
  }, [navState]);

  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(openNav());
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(closeNav());
  };
  useEffect(() => {
    handleDrawerOpen();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <SideDrawer handleDrawerClose={handleDrawerClose} />
        </Drawer>
        <Main open={open}>
          <Navbar />
          <Box sx={{ p: 2 }} style={{ height: "89vh" }}>
            <Box
              style={{
                backgroundColor: "#e3f2fd",
                borderRadius: "16px",
                height: "89vh",
              }}
              sx={{ p: 2 }}
            >
              {userState?.email !== null && (
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <ChatHeader />
                    <ChatMain />
                    <ChatFooter />
                  </Grid>
                  <Grid item xs={3}>
                    <UserProfileCart />
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        </Main>
      </Box>
    </div>
  );
};

export default Index;
