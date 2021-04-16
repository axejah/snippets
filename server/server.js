require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.APP_PORT;
const CORS_DOMAIN = process.env.CORS_DOMAIN || `http://localhost:${PORT}`;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: `${CORS_DOMAIN}`,
    credentials: true,
  })
);
app.use(cookieParser());

// routes
const authRoute = require("./routes/users");
const snippets = require("./routes/snippets");
app.use("/api", snippets);
app.use("/api", authRoute);

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
  console.log(`server is running on ${PORT}, CORS DOMAIN: ${CORS_DOMAIN}`);
});
