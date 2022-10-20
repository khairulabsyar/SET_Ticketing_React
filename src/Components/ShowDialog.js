import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { UseAuth, UseDialog } from "../Hooks";
import { Status } from ".";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CustomizedSelectForFormik = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      sx={{ width: "50%" }}
    >
      {children}
    </Select>
  );
};

function ShowDialog({ ticket }) {
  const { editTicket, getTickets, token } = UseAuth();
  const { role, getDevList } = UseAuth();
  const { closeTixDetails } = UseDialog();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTicket = () => {
    return axios.get("http://127.0.0.1:8000/api/ticket", config);
  };

  const { refetch } = useQuery(["tickets"], fetchTicket, {
    enabled: true,
    onSuccess: (res) => {
      console.log("Successfull", res);
    },
    onError: (res) => {
      console.log("Error", res);
    },
  });

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        editTicket(values, ticket.id);
        closeTixDetails();
        refetch();
      }}
    >
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2%",
          padding: "2% 2%",
          width: 600,
          height: 400,
        }}
      >
        <h3>
          #{ticket.id}: {ticket.title}
        </h3>
        <p>Description: {ticket.description}</p>
        <p>Status: {ticket.status}</p>
        <FormControl>
          {role?.includes("Developer") ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 2,
                  width: 400,
                }}
              >
                <label>Update Status: </label>
                <Field name='status_id' component={CustomizedSelectForFormik}>
                  {Status.map((state) => {
                    return (
                      <MenuItem value={state.id} sx={{ width: 1 }}>
                        {state.status}
                      </MenuItem>
                    );
                  })}
                </Field>
              </Box>
              <br />
              <Button type='submit' variant='contained'>
                {" "}
                Update
              </Button>
            </>
          ) : role?.includes("Admin") ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 2,
                  width: 400,
                }}
              >
                <label>Assign Developer: </label>
                <Field
                  name='developer_id'
                  component={CustomizedSelectForFormik}
                >
                  {getDevList.map((dev) => {
                    return (
                      <MenuItem sx={{ width: 1 }} value={dev.id}>
                        {dev.first_name}
                      </MenuItem>
                    );
                  })}
                </Field>
              </Box>
              <br />
              <Button type='submit' variant='contained'>
                {" "}
                Update
              </Button>
            </>
          ) : null}
        </FormControl>
      </Form>
    </Formik>
  );
}

export default ShowDialog;
