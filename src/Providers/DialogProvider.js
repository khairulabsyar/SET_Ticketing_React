import React, { useState } from "react";

import DialogContext from "../Context/DialogContext";

function AuthProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [tixOpen, setTixOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  const showTixDetails = () => {
    setTixOpen(true);
  };
  const closeTixDetails = () => {
    setTixOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        openDialog,
        closeDialog,
        open,
        tixOpen,
        showTixDetails,
        closeTixDetails,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export default AuthProvider;
