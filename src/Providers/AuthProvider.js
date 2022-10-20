import React, { useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiSignIn, apiGetDev } from "../Api/users";
import { createTix, editTix, delTix, showTix } from "../Api/tickets";

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [getDevList, setGetDevList] = useState(null);
  const navigate = useNavigate(null);

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    setId(null);
    setGetDevList(null);
  };

  const signin = async (luser) => {
    const { data } = await apiSignIn(luser);
    if (data.message === "Success Login" && data.data.token) {
      setToken(data?.data?.token);
      setUser(data?.data?.firstName);
      setRole(data?.data?.role);
      setId(data?.data?.id);
      alert("Successfully Login");
      if (data?.data?.role === "Client") {
        navigate("/create-tix");
      } else {
        navigate("/home");
      }
    } else {
      alert(data.message);
      navigate(`/home`);
    }
  };

  const getDeveloper = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await apiGetDev(config);
    setGetDevList(data);
  };

  useEffect(() => {
    getDeveloper();
  }, [token]);

  const createTicket = async (ticket) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await createTix(ticket, config);
  };

  const getTickets = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await showTix(config);
  };

  const deleteTicket = async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await delTix(config, id);
    alert("Ticket deleted!");
  };

  const editTicket = async (tick, id) => {
    const con = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await editTix(con, tick, id);
    console.log(data);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        id,
        getDevList,
        logout,
        signin,
        createTicket,
        getTickets,
        editTicket,
        deleteTicket,
        getDeveloper,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
