import React from "react";
import Navigation from "./Header/Navigation";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function Layout() {
  return (
    <>
      <Navigation />
      <main>
        <Box
          sx={{
            display: "flex",
            height: `calc(100vh - 10vh)`,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Box>
      </main>
    </>
  );
}

export default Layout;
