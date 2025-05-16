import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setLogin } = useAuth(); // Use the setLogin function from context

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted:", values);

      // Simulate API call
      try {
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data);

          // Simulate successful login by setting the user data
          const userData = { email: data?.user?.email, token: data?.token }; // Example user data
          setLogin(userData); // Set the user data in the context

          // Optionally navigate to a different page after login
          navigate("/homepage"); // Example redirection to a dashboard
          alert("Login successful!");
        } else {
          alert("Login not successful!");
        }
      } catch (error) {
        console.error("API Error:", error);
        alert("Login failed. Please try again.");
      }
    },
  });

  return (
    <Container
      style={{ height: "100vh" }}
      className="flex justify-center align-middle items-center"
    >
      <Box className="max-w-md">
        <Typography variant="h4" className="mb-6 text-center">
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} className="mb-6 w-full ">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="remember"
                name="remember"
                checked={formik.values.remember}
                onChange={formik.handleChange}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Login
          </Button>
        </form>
        <Typography className="text-center mt-4 w-full">
          Don't have an account?{" "}
          <Link
            // href="/signup"
            onClick={() => navigate("/signup")}
            className="cursor-pointer"
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
