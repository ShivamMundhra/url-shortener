const Validator = require("validator");
const isEmpty = require("is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validateBeforeSignUp = (data) => {
  let errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.passwordConfirm = isEmpty(data.passwordConfirm)
    ? ""
    : data.passwordConfirm;
  console.log(data);
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm Password is required";
  }
  if (data.password !== data.passwordConfirm) {
    errors.password = "Passwords must match";
  }
  if (data.password.length < 8) {
    errors.password = "Min password length is 8";
  }
  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

const validateBeforeSignIn = (data) => {
  let errors = {};
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendJWT = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: req.secure || req.headers("x-forwarded-proto") === "https",
  };

  res.cookie("UrlShortnerJwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res, next) => {
  let { name, email, password, passwordConfirm } = req.body;
  const { hasErrors, errors } = validateBeforeSignUp({
    name,
    email,
    password,
    passwordConfirm,
  });
  if (hasErrors) {
    return res.status(400).json(errors);
  } else {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = await User.create({ name, email, password });
      sendJWT(newUser, 201, req, res);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.msg });
    }
  }
};

exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  console.log(email, password);
  const { hasErrors, errors } = validateBeforeSignIn({ email, password });
  if (hasErrors) {
    console.log();
    return res.status(400).json(errors);
  } else {
    try {
      const user = await User.findOne({ email: email }).select("+password");
      console.log(user);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Incorrect Email or Password" });
      }
      sendJWT(user, 200, req, res);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Some error occured try again later" });
    }
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.UrlShortnerJwt) {
    token = req.cookies.UrlShortnerJwt;
  }
  if (!token) {
    return res.status(400).json({ message: "Please Log In" });
  }
  // else(
  //   console.log(token)
  // )
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Some error occured. Please try agian later" });
    } else {
      try {
        const user = await User.findById(decoded.id);
        if (!user) {
          return res
            .status(400)
            .json({ message: "Please log in with valid credentials" });
        }
        req.user = user;
        next();
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
  });
};

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.body);

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.UrlShortnerJwt) {
    token = req.cookies.UrlShortnerJwt;
  }
  if (!token) {
    // console.log("Hello");
    return next();
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next();
    } else {
      try {
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(400).json({ message: "Not Logged In" });
        }
        return res.status(201).json({
          status: "sucess",
          user: {
            name: user.name,
            email: user.email,
            urls: [...user.urls],
          },
        });
      } catch (error) {
        return res.status(400).json({ message: "Not Logged In" });
      }
    }
  });
};

exports.checkUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.UrlShortnerJwt) {
    token = req.cookies.UrlShortnerJwt;
  }
  if (!token) {
    return res.status(400).json({ message: "Please Log In" });
  }
  // else(
  //   console.log(token)
  // )
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next();
    } else {
      try {
        const user = await User.findById(decoded.id);
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      } catch (error) {
        return next();
      }
    }
  });
};
exports.logout = (req, res, next) => {
  res.cookie("UrlShortnerJwt", "logout");
  res.status(200).json({
    status: "success",
  });
};
