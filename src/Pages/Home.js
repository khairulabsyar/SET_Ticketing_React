import { Box } from "@mui/material";
import React from "react";

function Home() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Welcome To Ticketing System</h1>
        <img src='https://uploads-ssl.webflow.com/60edc0a8835d5b38bf11f03f/61cf04c1ec15b5390aed45da_Benefits-of-Ticketing-Management-System.png' />
      </Box>
    </>
  );
}

export default Home;
