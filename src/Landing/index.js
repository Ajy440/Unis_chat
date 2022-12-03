import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Index = () => {
  return (
    <div>
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
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "left",
              width: "100%",
            }}
          >
            <Grid item xs={5}>
              <Box
                sx={{
                  width: "100%",
                  height: "90vh",
                  borderRadius: "16px",
                  backgroundSize: "contain",
                  backgroundImage: `url(${"https://img.freepik.com/free-vector/cellphone-concept-illustration_114360-6398.jpg?w=2000"})`,
                }}
              ></Box>
            </Grid>
            <Grid item xs={5} sx={{ p: 5 }}>
              <Box sx={{ p: 5 }}>
                {" "}
                <Typography
                  component="div"
                  variant="h2"
                  sx={{ display: "flex", mt: 18 }}
                >
                  Unis Chat
                </Typography>
                <Typography
                  component="div"
                  variant="h4"
                  sx={{ display: "flex", mt: 2 }}
                >
                  The only chat app you will ever need.
                </Typography>
                <Typography
                  component="div"
                  variant="p"
                  sx={{ display: "flex", mt: 2, fontSize: "18px" }}
                >
                  Still in development, Still need to go a long way.
                  <br />
                  Join us in the journey.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Index;
