require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const PORT = process.env.APP_PORT;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// api routes
const authRoute = require("./routes/users");
const snippets = require("./routes/snippets");
app.use("/api", snippets);
app.use("/api", authRoute);

// serve static files
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

mongoose.connect(
  process.env.MONGO_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log(err);
    console.log(`MongoDB connection initialized`);
  }
);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
