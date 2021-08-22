const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRoutes = require("./routes/api");

const app = express();
app.use(express.json());
app.use("/api", apiRoutes);
app.use(cors());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// console.log(db);
// if (process.env.NODE_env === 'production') {
//   //later code
// }

const port = process.env.PORT || 9000;

app.listen(port, console.log(`running on port ${port}`));
