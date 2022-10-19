import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import UseAuth from "../Hooks/UseAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UseDialog } from "../Hooks";

function CreateTix() {
  const { id, createTicket } = UseAuth();
  const navigate = useNavigate(null);

  const queryClient = useQueryClient();

  const cT = useMutation(createTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tickets"]);
      alert("Successfully created new ticket");
      navigate("/show-tix");
    },
    onError: () => {
      alert("Unable to create ticket");
    },
  });

  const validationSchema = yup.object({
    title: yup
      .string("Enter your title")
      .min(5, "Title should be of minimum 5 characters length")
      .required("Title is required"),
    description: yup
      .string("Enter your description")
      .min(5, "Description should be of minimum 5 characters length")
      .required("Description is required"),
    priority: yup
      .string("Enter the ticket's prority (High, Medium or Low)")
      .lowercase()
      .oneOf(["high", "medium", "low"])
      .required("Prority is required (High, Medium or Low)"),
    status: yup
      .string("Enter the ticket's status (In Progress, Complete or Backlog)")
      .lowercase()
      .oneOf(["in progress", "complete", "backlog"])
      .required("Status is required (In Progress, Complete or Backlog)"),
    category: yup
      .string("Enter the ticket's category (Invoke, Adnexio or Decoris)")
      .lowercase()
      .oneOf(["invoke", "adnexio", "decoris"])
      .required("Category is required  (Invoke, Adnexio or Decoris)"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      user_id: id,
      priority: "",
      status: "",
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      let status = 0;
      let priority = 0;
      let category = 0;

      switch (formik.values.priority.toLowerCase()) {
        case "high":
          priority = 1;
          break;
        case "medium":
          priority = 2;
          break;
        case "low":
          priority = 3;
          break;
        default:
          alert("Error");
          break;
      }
      switch (formik.values.status.toLowerCase()) {
        case "in progress":
          status = 1;
          break;
        case "complete":
          status = 2;
          break;
        case "backlog":
          status = 3;
          break;
        default:
          alert("Error");
          break;
      }
      switch (formik.values.category.toLowerCase()) {
        case "invoke":
          category = 1;
          break;
        case "adnexio":
          category = 2;
          break;
        case "decoris":
          category = 3;
          break;
        default:
          alert("Error");
          break;
      }
      const data = {
        title: formik.values.title,
        description: formik.values.description,
        user_id: id,
        priority_id: priority,
        status_id: status,
        category_id: category,
      };
      cT.mutate(data);
    },
  });

  return (
    <>
      <Paper
        sx={{
          height: "70vh",
          width: "75vw",
          bgcolor: "light",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        // variant='outlined'
        elevation={16}
      >
        <h2>Create Ticket</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
          onSubmit={formik.handleSubmit}
        >
          <label>Title</label>
          <TextField
            fullWidth
            id='title'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <label>Description</label>
          <TextField
            fullWidth
            id='description'
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <label>Priority Level</label>
              <TextField
                id='priority'
                name='priority'
                value={formik.values.priority}
                onChange={formik.handleChange}
                error={
                  formik.touched.priority && Boolean(formik.errors.priority)
                }
                helperText={formik.touched.priority && formik.errors.priority}
                label='(High/Medium/Low)'
                variant='outlined'
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <label>Status Level </label>
              <TextField
                id='status'
                name='status'
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
                label='(In Progress/Complete/Backlog)'
                variant='outlined'
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <label>Category </label>
              <TextField
                id='category'
                name='category'
                value={formik.values.category}
                onChange={formik.handleChange}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
                label='(Invoke/Adnexio/Decoris)'
                variant='outlined'
              />
            </Box>
          </Box>
          <Button
            variant='contained'
            type='submit'
            color='success'
            sx={{ width: 1 / 7 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default CreateTix;
