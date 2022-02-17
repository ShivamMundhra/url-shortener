import React,{useState} from "react";
import {useHistory} from "react-router-dom"
// import Snackbar from "@bit/mui-org.material-ui.snackbar";
import axios from "axios";
import styles from "./styles.module.css"
const initialFormFields = {
  email: "",
  name:"",
  password: "",
  passwordConfirm:""
};

const SignUp = (props) => {
  const history = useHistory();
  const [formFields, setFormFields] = useState(initialFormFields);
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((formFields) => ({ ...formFields, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/v1/users/signup',formFields)
    .then((data)=>{
      props.login(data.data.data.user);
      history.push("/home");
    })
    .catch(err=>{setOpen(true);console.log(err)});
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return <div className={styles.SignUp}>
  <form onSubmit={handleSubmit}>
    <label htmlFor="name">
      Name
      <input
        value={formFields.name}
        name="name"
        type="text"
        id="name"
        onChange={handleChange}
      />
    </label><label htmlFor="email">
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
      <label htmlFor="passwordConfirm">
      Confirm Your Password
      <input
        value={formFields.passwordConfirm}
        name="passwordConfirm"
        type="password"
        id="passwordConfirm"
        onChange={handleChange}
      />
    </label>
    </label>
    <button type="submit">Signup</button>
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
</div>;
};

export default SignUp;
