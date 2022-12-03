import React from "react";
import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import { Avatar } from "@mui/joy";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const UserProfileCart = () => {
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
      </Container>
    </Paper>
  );
};

export default UserProfileCart;
