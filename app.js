const express = require("express");
const {Server} = require('socket.io');
const app = express();

const mongoose = require('mongoose');
const cors = require("cors");
const multer = require('multer');
const session = require("express-session");
const path = require('path');
const bodyParser = require("body-parser");
const helmet=require("helmet")
const compression=require("compression")
const leadsRoute=require("./routes/leads")
require('dotenv').config();

// Now you can access your environment variables
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;

const PORT=process.env.PORT||8000
app.use(helmet())
app.use(compression())
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors())


app.use("/leads", leadsRoute);

app.use(
    session({
      secret: "thisIsABigSecretForEveryEntryToThebusiness", // Replace with your secret key
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 30 * 24 * 60 * 60 * 1000, // Session expiration in milliseconds (30 days)
      },
    })
  );
  // console.log(process.env.NODE_ENV)
  // 7. Connect to the MongoDB database and start the server.
// mongodb+srv://:}@cluster0.nvcekiv.mongodb.net/
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  // Connect to MongoDB after the server has started
  mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.nvcekiv.mongodb.net/${mongoCluster}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
});