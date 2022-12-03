import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "../Firebase/config";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    email: yup.string().required().email(),
    pass: yup.string().required().min(8),
  })
  .required();

const Login = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    console.log("loading");
  }
  if (error) {
    console.log(error?.message);
    notify(error?.message, "error");
  }
  if (user) {
    console.log(user.email);
    navigate("/chat");
  }

  const notify = (msg, type) => {
    if (type === "error") {
      toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (type === "success") {
      toast.success(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    signInWithEmailAndPassword(auth, data.email, data.pass)
      .then()
      .catch((err) => notify(err?.message, "error"));
  };

  return (
    <>
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
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      {...register("email")}
                    />
                    <p>{errors.email?.message}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      {...register("pass")}
                    />
                    <p>{errors.pass?.message}</p>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link variant="body2" onClick={() => navigate("/signup")}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Login;
