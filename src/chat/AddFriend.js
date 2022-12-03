import React, { useEffect, useState } from "react";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseApp } from "../Firebase/config";
import { Select } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const db = getFirestore(firebaseApp);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddFriend = () => {
  const auth = getAuth(firebaseApp);

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

  const [globalUserData, updateGlobalUserData] = useState([]);
  const [selectedValue, updateselectedValue] = useState("def");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    updateselectedValue("def");
  };

  const [value, loading, error] = useCollection(
    collection(getFirestore(firebaseApp), "users/global/data"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (value) {
      const users = [];
      value.docs.map((doc) => {
        if (doc.data().email !== auth.currentUser?.email) {
          users.push(doc.data());
        }
      });

      updateGlobalUserData(users);
    }
  }, [value]);

  let gusers = "";
  gusers = globalUserData.map((user) => {
    return (
      <MenuItem
        data-my-value={user.email}
        value={user.email}
        onClick={(e) => {
          updateselectedValue(e.currentTarget.dataset.myValue);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar
              alt="Remy Sharp"
              src={user.photoURL}
              sx={{ width: 32, height: 32, display: "flex" }}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography component="div" variant="h8" sx={{ display: "flex" }}>
              {user.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {user.email}
            </Typography>
          </Grid>
        </Grid>
      </MenuItem>
    );
  });

  const addUsertoFriend = async () => {
    console.log("called");
    console.log(auth.currentUser?.email);
    console.log(selectedValue);

    const data = {
      ts: Date.now(),
    };

    await setDoc(
      doc(
        db,
        "userFriends/" + auth.currentUser.email + "/" + "friends",
        selectedValue
      ),
      data
    )
      .then(async () => {
        await setDoc(
          doc(
            db,
            "userFriends/" + selectedValue + "/" + "friends",
            auth.currentUser.email
          ),
          data
        ).then(() => {
          notify("User Added", "success");
          handleClose();
        });
      })
      .catch((err) => {
        notify("Failed to add user", "error");
      });
  };

  return (
    <>
      <Button onClick={handleOpen}>Add Friend</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Friend
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <Grid container>
                <Select>
                  <MenuItem
                    selected
                    data-my-value={"def"}
                    value={"def"}
                    onClick={(e) => {
                      updateselectedValue(e.currentTarget.dataset.myValue);
                    }}
                  >
                    Select a User
                  </MenuItem>
                  {gusers}
                </Select>
              </Grid>
            </Typography>
            {selectedValue !== "def" && (
              <Button sx={{ mt: 3 }} onClick={addUsertoFriend}>
                Add {selectedValue}
              </Button>
            )}
          </Box>
        </Fade>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddFriend;
