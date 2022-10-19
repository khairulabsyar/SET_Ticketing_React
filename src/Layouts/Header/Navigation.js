import { forwardRef } from "react";
import {
  Box,
  Button,
  Dialog,
  Slide,
  useTheme,
  IconButton,
} from "@mui/material";
import { UseAuth, UseDarkMode, UseDialog } from "../../Hooks";
import { NavbarComponent, SignInSignUp } from "../../Components";
import { Dark, Light } from "../../Assets";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const style = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
});

const linkList = [
  { url: "home", name: "Ticketing" },
  { url: "show-tix", name: "Show Tickets" },
  { url: "create-tix", name: "Create Ticket" },
];

function Navigation() {
  const theme = useTheme();
  const { logout, token } = UseAuth();
  const { openDialog, closeDialog, open } = UseDialog();
  const colorMode = UseDarkMode();

  const handleClickOpen = () => {
    openDialog();
  };

  const handleClickClose = () => {
    closeDialog();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "10vh",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 1,
        }}
      >
        {/* Right side */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 1,
            pl: 1,
          }}
        >
          {linkList.map((list) => {
            return (
              <NavbarComponent url={list.url} name={list.name} style={style} />
            );
          })}
        </Box>

        {/* Left side , sign in*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            pr: 1,
          }}
        >
          {/* light / dark mode */}
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{ bgcolor: "white" }}
          >
            {theme.palette.mode === "dark" ? (
              <img src={Light} alt='light mode' />
            ) : (
              <img src={Dark} alt='dark mode' />
            )}
          </IconButton>

          {/* Button to show sign in sign up popup */}
          {!token ? (
            <Button variant='outlined' onClick={handleClickOpen}>
              Register
            </Button>
          ) : (
            <Button variant='outlined' onClick={() => handleLogout()}>
              Log Out
            </Button>
          )}
        </Box>
      </Box>

      {/* Popup for rsign in sign up  */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            bgcolor: "white",
          }}
        >
          <SignInSignUp />
        </Box>
      </Dialog>
    </>
  );
}

export default Navigation;
