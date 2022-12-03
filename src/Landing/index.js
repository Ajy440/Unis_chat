import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

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
        ></Box>
      </Box>
    </div>
  );
};

export default Index;
