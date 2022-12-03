import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
}));

const SideDrawer = (props) => {
  const theme = useTheme();
  return (
    <>
      <DrawerHeader>
        <h1>Chats</h1>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <IconButton onClick={() => props.handleDrawerClose()}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
      </DrawerHeader>
      <div style={{ padding: 5 }}>
        <Card sx={{ display: "flex", p: 1, backgroundColor: "#ede7f6" }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Avatar
                alt="Remy Sharp"
                src="https://berrydashboard.io/free/static/media/user-round.13b5a31bebd2cc6016d6db2cac8e92d1.svg"
                sx={{ width: 32, height: 32, display: "flex" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography component="div" variant="h8" sx={{ display: "flex" }}>
                Ajay Pratap
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Mac Miller
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
};

export default SideDrawer;
