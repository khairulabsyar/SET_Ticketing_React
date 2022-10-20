import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Button, TextField, Box, useTheme } from "@mui/material";
import * as yup from "yup";
import { CSSTransition } from "react-transition-group";
import UseAuth from "../Hooks/UseAuth";
import UseDialog from "../Hooks/UseDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiSignUp } from "../Api/users";
import { useNavigate } from "react-router-dom";

function SignInSignUp() {
  const { signin } = UseAuth();
  const { closeDialog } = UseDialog();
  const theme = useTheme();
  const navigate = useNavigate(null);
  const ref = useRef(null);
  const [signUpIsVisible, setSignUpIsVisible] = useState(true);
  const [signInIsVisible, setSignInIsVisible] = useState(false);

  const queryClient = useQueryClient();

  const mutationSignUp = useMutation(apiSignUp, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      alert("Unable to Sign Up");
    },
  });

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your name")
      .min(5, "Name should be of minimum 5 characters length")
      .required("Name is required"),
    lastName: yup
      .string("Enter your name")
      .min(5, "Name should be of minimum 5 characters length")
      .required("Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    changePassword: yup
      .string()
      .required("Password is required")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Both password need to be the same"),
      }),
    role: yup
      .string("Enter your role (Admin, Developer or Client)")
      .lowercase()
      .oneOf(["admin", "developer", "client"])
      .required("Role is required (Admin, Developer or Client)"),
  });

  const validationSchemaSignIn = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      changePassword: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setSignInIsVisible(true);
      const data = {
        first_name: formik.values.firstName,
        last_name: formik.values.lastName,
        password: formik.values.password,
        email: formik.values.email,
        role: formik.values.role,
      };
      mutationSignUp.mutate(data);
    },
  });

  const formikSignIn = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaSignIn,
    onSubmit: (values) => {
      signin(values);
      setSignInIsVisible(false);
      closeDialog();
    },
  });

  const signUp = (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <label>First Name</label>
        <TextField
          fullWidth
          id='firstName'
          name='firstName'
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <label>Last Name</label>
        <TextField
          fullWidth
          id='lastName'
          name='lastName'
          type='lastName'
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <label>Email</label>
        <TextField
          fullWidth
          id='email'
          name='email'
          type='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <label>Password</label>
        <TextField
          fullWidth
          id='password'
          name='password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <label>Confirm Password</label>
        <TextField
          fullWidth
          id='changePassword'
          name='changePassword'
          type='password'
          value={formik.values.changePassword}
          onChange={formik.handleChange}
          error={
            formik.touched.changePassword &&
            Boolean(formik.errors.changePassword)
          }
          helperText={
            formik.touched.changePassword && formik.errors.changePassword
          }
        />
        <label>Role (Admin/Developer/Client)</label>
        <TextField
          fullWidth
          id='role'
          name='role'
          type='role'
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
        />
        <Button variant='contained' type='submit' color='success'>
          Submit
        </Button>
        <Button variant='contained' onClick={() => setSignInIsVisible(true)}>
          Sign In
        </Button>
      </form>
      <br />
    </>
  );

  const signIn = (
    <>
      <form
        onSubmit={formikSignIn.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <label>Email</label>
        <TextField
          fullWidth
          id='email'
          name='email'
          type='email'
          value={formikSignIn.values.email}
          onChange={formikSignIn.handleChange}
          error={
            formikSignIn.touched.email && Boolean(formikSignIn.errors.email)
          }
          helperText={formikSignIn.touched.email && formikSignIn.errors.email}
        />
        <label>Password</label>
        <TextField
          fullWidth
          id='password'
          name='password'
          type='password'
          value={formikSignIn.values.password}
          onChange={formikSignIn.handleChange}
          error={
            formikSignIn.touched.password &&
            Boolean(formikSignIn.errors.password)
          }
          helperText={
            formikSignIn.touched.password && formikSignIn.errors.password
          }
        />
        <Button variant='contained' type='submit' color='success'>
          Submit
        </Button>
        <Button variant='contained' onClick={() => setSignUpIsVisible(true)}>
          Create new account
        </Button>
      </form>
      <br />
    </>
  );

  return (
    <>
      <Box
        sx={{
          width: "500px%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        fullWidth
      >
        {/* Sign Up */}
        <CSSTransition
          in={signUpIsVisible}
          ref={ref}
          timeout={signUpIsVisible ? 1000 : 0}
          unmountOnExit
          classNames='alert'
          onEnter={() => setSignInIsVisible(false)}
          onExit={() => setSignInIsVisible(true)}
        >
          <Box
            sx={{
              m: 1,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              overflow: "visible",
              borderRadius: 5,
              bgcolor: theme.palette.mode === "dark" ? "black" : "white",
              alignItems: "center",
            }}
          >
            {signUp}
          </Box>
        </CSSTransition>

        {/* Sign In */}
        <CSSTransition
          in={signInIsVisible}
          ref={ref}
          timeout={signInIsVisible ? 1000 : 0}
          unmountOnExit
          classNames='alert'
          onEnter={() => setSignUpIsVisible(false)}
          onExit={() => setSignUpIsVisible(true)}
        >
          <Box
            sx={{
              m: 1,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              overflow: "visible",
              borderRadius: 5,
              bgcolor: theme.palette.mode === "dark" ? "black" : "white",
              alignItems: "center",
            }}
          >
            {signIn}
          </Box>
        </CSSTransition>
      </Box>
    </>
  );
}

export default SignInSignUp;
