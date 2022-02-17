import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import Snackbar from "@bit/mui-org.material-ui.snackbar";

const initialFormFields = {
  email: "",
  password: "",
};

const Login = (props) => {
  const history = useHistory();
  const [formFields, setFormFields] = useState(initialFormFields);
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((formFields) => ({ ...formFields, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/v1/users/login", formFields)
      .then((data) => {
        props.login(data.data.data.user);
        history.push("/home");
      })
      .catch((err) => {
        setOpen(true);
        console.log(err);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className={styles.Login}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            value={formFields.email}
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            value={formFields.password}
            name="password"
            type="password"
            onChange={handleChange}
            id="password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {/* <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Please try again"
      /> */}
    </div>
  );
};

export default Login;
