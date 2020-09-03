const express = require("express");
const mongoose = require("mongoose");

const morgan = require("morgan");
const app = express();
const urlShortnerRouter = require("./routes/urlShortnerRoutes");
const redirectRouter = require("./routes/redirectRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
// console.log(process.env.DB_PASSWORD);
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection Successful"));

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/v1/shorten", urlShortnerRouter);
app.use("/api/v1/redirect", redirectRouter);
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App runing on Port: ${PORT}`);
});
