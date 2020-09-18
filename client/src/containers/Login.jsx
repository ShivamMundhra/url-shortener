import React, { useState } from "react";
import styles from "./styles.module.css";

const initialFormFields = {
  email: "",
  password: "",
};

const Login = (props) => {
  const [formFields, setFormFields] = useState(initialFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((formFields) => ({ ...formFields, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formFields);
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
    </div>
  );
};

export default Login;
