import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { login } from "../../services/user.service";

const LoginDialog = ({ open, onClose, onLoginSuccess }) => {
  const initialValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    login(values).then((res) => {
      localStorage.setItem("access_token", res.data.token);
      onLoginSuccess();
 
    });
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={() => {}} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h6">Login</Typography>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values, touched, errors }) => (
            <Form>
              <TextField
                margin="dense"
                name="email"
                label="Email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <DialogActions>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ textTransform: "none" }}
                >
                  Login
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
