import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

function UseAuth() {
  return useContext(AuthContext);
}

export default UseAuth;
