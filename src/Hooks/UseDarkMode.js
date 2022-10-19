import { useContext } from "react";
import DarkModeContext from "../Context/DarkModeContext";

function UseDarkMode() {
  return useContext(DarkModeContext);
}

export default UseDarkMode;
