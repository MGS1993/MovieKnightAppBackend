const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connect;
db.once("error", console.error.bind(console, "MongoDB connection error:"));

// if (process.env.NODE_env === 'production') {
//   //later code
// }

const port = process.env.PORT || 9000;

app.listen(port, console.log(`running on port ${port}`));
