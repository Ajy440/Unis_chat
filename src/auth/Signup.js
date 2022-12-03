import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { firebaseApp } from "../Firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Navbar from "../components/Navbar";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const db = getFirestore(firebaseApp);
const theme = createTheme();

const userAvatars = [
  {
    index: 0,
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa69_HGc_i3MXKCPZzCfAjBZC4bXJsn0rS0Ufe6H-ctZz5FbIVaPkd1jCPTpKwPruIT3Q&usqp=CAU",
    selected: true,
  },
  {
    index: 1,
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLzkDw75fYc1bQlOb0k_D-legpY0ki6UN2fp94qGJk1_QQVM5ZzZGM70d2XwGPklPViS8&usqp=CAU",
    selected: false,
  },
  {
    index: 2,
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8y4wQzs57ERm7zfqqovNN3zBtUvDIk9E5RNOecVDTRkU6qckLwi_Q4dTZ5rmR3SzJNcc&usqp=CAU",
    selected: false,
  },
  {
    index: 3,
    link: "https://cdn.imgbin.com/19/10/0/imgbin-computer-icons-user-profile-avatar-woman-young-sXPMucRC4vTEXJzgE18RGfSe0.jpg",
    selected: false,
  },
  {
    index: 4,
    link: "https://static.vecteezy.com/system/resources/previews/004/773/280/non_2x/the-happy-girl-laughs-human-emotions-avatar-with-a-happy-woman-vector.jpg",
    selected: false,
  },
];

const schema = yup
  .object({
    email: yup.string().required().email(),
    fname: yup.string().required().min(2),
    lname: yup.string().required().min(2),
    pass: yup.string().required().min(8),
  })
  .required();

const Signup = () => {
  const auth = getAuth(firebaseApp);
  const formRef = React.useRef();
  const [selectedAvatar, updateSelectedAvatar] = useState(userAvatars[0].link);
  const [formData, updateFormData] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

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

  if (user) {
    console.log(user);
    updateProfile(auth.currentUser, {
      displayName: formData.fname + " " + formData.lname,
      photoURL: selectedAvatar,
    })
      .then(() => {
        addUData().then(() => {
          console.log("done");
          navigate("/chat");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log(error?.message);
    notify(error?.message, "error");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    updateFormData(data);
    createUserWithEmailAndPassword(data.email, data.pass);
  };

  const addUData = async () => {
    await setDoc(doc(db, "users/global/data", formData.email), {
      name: formData.fname + " " + formData.lname,
      status: "offline",
      email: formData.email,
      photoURL: selectedAvatar,
    });
  };

  const updateSelectedAvatarfun = (index, link) => {
    for (const i in userAvatars) {
      if (userAvatars[i].index === index) {
        {
          userAvatars[i].selected = true;
        }
      } else {
        userAvatars[i].selected = false;
      }
    }
    updateSelectedAvatar(link);
  };

  return (
    <div className="App">
      <Navbar />
      <Box sx={{ p: 2 }} style={{ height: "89vh" }}>
        <Box
          style={{
            backgroundColor: "#e3f2fd",
            borderRadius: "16px",
            height: "89vh",
            overflow: "scroll",
          }}
          sx={{ p: 2 }}
        >
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ mt: 3 }}
                  ref={formRef}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        {...register("fname")}
                        autoFocus
                      />
                      <p>{errors.fname?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        {...register("lname")}
                      />
                      <p>{errors.lname?.message}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        {...register("email")}
                      />
                      <p>{errors.email?.message}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("pass")}
                      />
                      <p>{errors.pass?.message}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <h3>Avatar</h3>
                      <Grid container spacing={2}>
                        {userAvatars.map((user) => (
                          <Grid item xs={2}>
                            <Avatar
                              key={user?.link}
                              alt="Remy Sharp"
                              src={user?.link}
                              onClick={() =>
                                updateSelectedAvatarfun(user.index, user.link)
                              }
                              style={{ cursor: "pointer" }}
                              sx={user.selected && { border: "solid" }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link
                        variant="body2"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Signup;
