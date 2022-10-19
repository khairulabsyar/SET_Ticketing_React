import { Button, Paper, Slide, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import LoginIcon from "@mui/icons-material/Login";

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
  password: yup.string().required("This field is required"),
  changePassword: yup.string().when("password", {
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

const MyButton = React.forwardRef((props, ref) => (
  <div role='button' {...props} ref={ref} />
));

const Register = () => {
  const [checked, setChecked] = React.useState(false);

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
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const signUp = (
    <Paper
      sx={{
        m: 1,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <h1 className=' text-lime-800'>Contact Us</h1>
      <h3>Please do not hesitate to contact me shold you have any questions</h3>
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
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Submit
        </Button>
      </form>
    </Paper>
  );

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <div className='h-screen w-screen'>
        <div className='flex items-center justify-between h-12 top-0 md:bg-red-500  bg-orange-500 px-5'>
          <div className='hidden md:block'>
            <Button
              variant='contained'
              component={MyButton}
              checked={checked}
              onClick={handleChange}
            >
              Sign In
            </Button>
          </div>
          <div className=' md:hidden absolute top-1 right-0 '>
            <Button
              variant='contained'
              component={MyButton}
              checked={checked}
              onClick={handleChange}
              sx={{ border: 1, borderRadius: 20 }}
            >
              <LoginIcon />
            </Button>
          </div>
        </div>

        <div className='flex flex-row justify-center bg-rose-200 h-[calc(100%_-_3rem)]'>
          <div className='bg-lime-800 w-full hidden lg:block'></div>
          <Slide direction='left' in={checked} mountOnEnter unmountOnExit>
            {signUp}
          </Slide>
        </div>
      </div>
    </>
  );
};

export default Register;
