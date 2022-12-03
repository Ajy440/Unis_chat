import React from "react";
import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import { Avatar } from "@mui/joy";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../Firebase/config";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const UserProfileCart = () => {
  const auth = getAuth(firebaseApp);
  const userState = useSelector((state) => state.chat.selectedUserData);

  return (
    <Paper
      elevation="1"
      sx={{
        width: "100%",
        backgroundColor: "white",
        height: "85vh",
        borderRadius: "18px",
        p: 2,
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={userState?.photoURL}
          sx={{ width: 65, height: 65, border: "solid" }}
        />
        <Typography
          component="div"
          variant="h6"
          sx={{ display: "flex", mt: 2 }}
        >
          {userState?.name}
        </Typography>

        <Box sx={{ backgroundColor: "yellow", width: "100%", mt: 3 }}>
          <Divider variant="middle" />
        </Box>

        <div
          style={{
            backgroundColor: "#1e88e5",
            padding: "0.5vw",
            borderRadius: "18px",
            marginTop: "12px",
          }}
        >
          <Grid container spacing={2} sx={{ p: 1, color: "white" }}>
            <Grid item xs={3}>
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={auth.currentUser?.photoURL}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Grid>

            <Grid item xs={3}>
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={userState?.photoURL}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Chip label="0 🔥" sx={{ color: "white", ml: 2 }} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Paper>
  );
};

export default UserProfileCart;
