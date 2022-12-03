import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../Firebase/config";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/joy/Chip";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DuoIcon from "@mui/icons-material/Duo";
import { useSelector, useDispatch } from "react-redux";
import { openNav } from "../store/slice/authSlice";

const pages = [
  { name: "Login", link: "/login", authed: false },
  { name: "Signup", link: "/signup", authed: false },
  { name: "Chat", link: "/chat", authed: true },
];
const settings = ["Logout"];

function Navbar() {
  const auth = getAuth(firebaseApp);
  const isAuthed = auth.currentUser !== null;

  const navigate = useNavigate();

  const navState = useSelector((state) => state.nav.value);
  //console.log(navState);

  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [upd, forceUpdate] = React.useState(true);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "white" }}
      elevation="0"
    >
      <Container maxWidth="xl" style={{ height: "8vh" }}>
        <Toolbar disableGutters>
          <DuoIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#5e35b1",
            }}
          />
          <Typography
            onClick={() => navigate("/Unis_chat")}
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              //fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            UNIS
          </Typography>

          <Box
            sx={{
              mr: 2,
              ml: 4,
              p: 0.5,
              cursor: "pointer",
              ...(navState && { display: "none" }),
            }}
            style={{ backgroundColor: "#5e35b1", borderRadius: "8px" }}
          >
            <MenuIcon
              color="red"
              aria-label="open drawer"
              onClick={() => dispatch(openNav())}
              style={{ height: "2vh" }}
            ></MenuIcon>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => navigate(page.link)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.link)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  backgroundColor: "#5e35b1",
                  "&:hover": {
                    backgroundColor: "#5e35b1",
                  },
                  borderRadius: "15px",
                  ml: 1,
                  ...(isAuthed && !page.authed && { display: "none" }),
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{ mr: 2, p: 1 }}
            style={{ backgroundColor: "#5e35b1", borderRadius: "15px" }}
          >
            <NotificationsNoneIcon></NotificationsNoneIcon>{" "}
          </Box>
          {isAuthed && (
            <Box sx={{ flexGrow: 0 }}>
              <div
                style={{
                  backgroundColor: "#1e88e5",
                  padding: "0.5vw",
                  borderRadius: "18px",
                }}
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={auth.currentUser?.photoURL}
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={async () => {
                        await signOut(auth);
                        await forceUpdate(!upd);
                        navigate("/Unis_chat");
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Chip>
                      <SettingsIcon style={{ color: "white" }} />{" "}
                    </Chip>
                  </IconButton>
                </Tooltip>
              </div>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
