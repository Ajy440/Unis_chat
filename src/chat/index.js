import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChatMain from "./ChatMain";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../Firebase/config";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import { useSelector, useDispatch } from "react-redux";
import { closeNav, openNav } from "../store/slice/authSlice";
import SideDrawer from "./SideDrawer";

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Index = () => {
  const auth = getAuth(firebaseApp);
  const isAuthed = auth.currentUser !== null;
  const navigate = useNavigate();

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
              <ChatMain />
            </Box>
          </Box>
        </Main>
      </Box>
    </div>
  );
};

export default Index;
