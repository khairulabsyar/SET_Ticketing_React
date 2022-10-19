import { Box, TextField } from "@mui/material";

const MyInput = ({ id, name, label, value, onChange, helperText, ...rest }) => {
  return (
    <Box
      component='form'
      sx={{
        "& .MuiInputBase-root": {
          height: 30,
        },
        "& > :not(style)": { m: 1, height: "1%" },
        "& label.Mui-focused": {
          color: "#09A3A9",
        },
        "& .MuiInput-underline:after ": {
          borderBottomColor: "#09A3A9",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "gray",
          },
          "&:hover fieldset": {
            borderColor: "yellow",
          },
          "&.Mui-focused fieldset ": {
            borderColor: "#09A3A9",
          },
        },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        helperText={helperText}
        // color="primary"
        {...rest}
      />
    </Box>
  );
};

export default MyInput;
