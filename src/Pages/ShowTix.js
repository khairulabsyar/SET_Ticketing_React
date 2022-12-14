import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Button, Dialog, Paper, useTheme } from "@mui/material";
import { ShowDialog } from "../Components";
import { UseAuth, UseDialog } from "../Hooks";

const ShowTix = () => {
  const { token, deleteTicket, role } = UseAuth();
  const theme = useTheme();
  const [ticket, setTicket] = useState([]);
  const { tixOpen, showTixDetails, closeTixDetails } = UseDialog();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTicket = () => {
    return axios.get(
      "https://set-ticketing-hello.herokuapp.com/api/ticket",
      config
    );
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["tickets"],
    fetchTicket,
    {
      enabled: true,
      onSuccess: (res) => {
        console.log("Successfull", res);
      },
      onError: (res) => {
        console.log("Error", res);
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  const Tickets = data?.data?.data;

  const handleClientOptionOn = (ticket) => {
    setTicket(ticket);
    showTixDetails();
  };

  const handleCloseDialog = () => {
    closeTixDetails();
  };

  const handleFetch = () => {
    refetch();
  };

  const handleDelete = (tixId) => {
    deleteTicket(tixId);
    handleFetch();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          height: 1,
        }}
      >
        {/* In Progress */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "5%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>In Progress Tickets</h1>
          {Tickets.length > 0
            ? Tickets?.map((ticket) =>
                ticket.status === "In Progress" ? (
                  <Paper
                    elevation={4}
                    style={{
                      width: "90%",
                      fontSize: "50%",
                      padding: "1%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 2,
                      backgroundColor:
                        theme.palette.mode === "light" ? "orange" : "orange",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "90%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "20%" }}>
                        <h1>
                          #{ticket.id}: {ticket.title}
                        </h1>
                      </Box>
                      <Box sx={{ width: "30%" }}>
                        <h1>Description: {ticket.description}</h1>
                      </Box>
                      <Box sx={{ width: "25%" }}>
                        <h1>Created By: {ticket.username}</h1>
                      </Box>
                      <Box sx={{ width: "25%" }}>
                        <h1>
                          Assign to:{" "}
                          {ticket.developer ? ticket.developer : "Unassigned"}
                        </h1>
                      </Box>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "10%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {role?.includes("Admin") ? (
                        <Button
                          onClick={() => handleDelete(ticket.id)}
                          variant='contained'
                          color='error'
                        >
                          Delete
                        </Button>
                      ) : null}
                      <Button
                        onClick={() => handleClientOptionOn(ticket)}
                        variant='contained'
                      >
                        More
                      </Button>
                    </div>
                  </Paper>
                ) : null
              )
            : null}
        </Box>

        {/* Backlog*/}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "5%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Backlog Tickets</h1>
          {Tickets.length > 0
            ? Tickets?.map((ticket) =>
                ticket.status === "Backlog" ? (
                  <Paper
                    elevation={4}
                    style={{
                      width: "90%",
                      fontSize: "50%",
                      padding: "1%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 2,
                      backgroundColor:
                        theme.palette.mode === "light" ? "lightyellow" : "peru",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "90%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "20%" }}>
                        <h1>
                          #{ticket.id}: {ticket.title}
                        </h1>
                      </Box>
                      <Box sx={{ width: "30%" }}>
                        <h1>Description: {ticket.description}</h1>
                      </Box>
                      <Box sx={{ width: "25%" }}>
                        <h1>Created By: {ticket.username}</h1>
                      </Box>
                      <Box sx={{ width: "25%" }}>
                        <h1>
                          Assign to:{" "}
                          {ticket.developer ? ticket.developer : "Unassigned"}
                        </h1>
                      </Box>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "10%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {role?.includes("Admin") ? (
                        <Button
                          onClick={() => handleDelete(ticket.id)}
                          variant='contained'
                          color='error'
                        >
                          Delete
                        </Button>
                      ) : null}
                      <Button
                        onClick={() => handleClientOptionOn(ticket)}
                        variant='contained'
                      >
                        More
                      </Button>
                    </div>
                  </Paper>
                ) : null
              )
            : null}
        </Box>

        {/* Completed*/}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "5%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Completed Tickets</h1>
          {Tickets.length > 0
            ? Tickets.map((ticket) =>
                ticket.status === "Complete" ? (
                  <Paper
                    elevation={4}
                    style={{
                      width: "90%",
                      fontSize: "50%",
                      padding: "1%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 2,
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "lightgreen"
                          : "seagreen",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "90%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "20%" }}>
                        <h1>
                          #{ticket.id}: {ticket.title}
                        </h1>
                      </Box>
                      <Box sx={{ width: "30%" }}>
                        <h1>Description: {ticket.description}</h1>
                      </Box>
                      <Box sx={{ width: "25%" }}>
                        <h1>Created By: {ticket.username}</h1>
                      </Box>
                      <Box sx={{ width: "25%" }}>
                        <h1>
                          Assign to:{" "}
                          {ticket.developer ? ticket.developer : "Unassigned"}
                        </h1>
                      </Box>
                    </div>
                  </Paper>
                ) : null
              )
            : null}
        </Box>
      </Box>

      <Dialog open={tixOpen} onClose={handleCloseDialog}>
        <ShowDialog ticket={ticket} />
      </Dialog>
    </>
  );
};

export default ShowTix;
