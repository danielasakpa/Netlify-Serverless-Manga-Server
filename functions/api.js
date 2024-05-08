// Core Modules
const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

// Third-party Modules
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const compression = require("compression");
const passport = require("passport");

// Environment Configuration
require("dotenv").config();

const app = express();

// Custom Modules
const connectDB = require("../utils/db");

// Connect to MongoDB
connectDB();

require("../utils/passport");

// Routes
const authRouter = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const readingListRoutes = require("../routes/readingListRoutes");
const commentRoutes = require("../routes/commentRoutes");

app.set('trust proxy', true)

// Define allowed origins
const allowedOrigins = [
  "https://manga-website1.netlify.app",
  "http://localhost:3000",
];

// CORS middleware function
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Set up session middleware
app.use(
  session({
    secret: "the_one_piece_is_real",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/readingList", readingListRoutes);
app.use("/api/comment", commentRoutes);

// const handler = serverless(app);
// module.exports.handler = async (event, context) => {
//   const { httpMethod } = event;

//   if (httpMethod === "OPTIONS") {
//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//       body: JSON.stringify({ message: "Preflight check successful" }),
//     };
//   }
//   const result = await handler(event, context);
//   return result;
// };


module.exports.handler = serverless(app);
