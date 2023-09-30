// Lib imports
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Response } from "express";

// Imports from files
import * as ErrorHandler from "./utils/errorHandlers";
import { closeDB, connectDB } from "./utils/dbHandlers";
import router from "./routes";

// Load the .env file config
dotenv.config({ path: "./.env" });

// Initialize the server and it's port
const app = express();
const PORT = process.env.PORT || 3000;

//----------------------
// Pre-processing
//----------------------

app.use(express.json());
app.use(cors());
app.use((_: never, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

//----------------------
// First handle invalid payload format
//----------------------

app.use(ErrorHandler.invalidPayloadHandler);

//----------------------
// Check if MongoDB connection string is supplied
//----------------------

if (!process.env.MONGO_URI) {
  console.log(
    "\x1b[31m",
    "ERROR: MongoDB connection string was not supplied.",
    "\x1b[0m"
  );
  process.exit(0);
}

// If string was supplied, try to connect to the database
connectDB();

//----------------------
// Load the routes
//----------------------

app.use("/", router);

// Defaults all error messages through this handler
// Mainly for formatting and automating error parsing
app.use(ErrorHandler.errorHandler);

//----------------------
// Handle database disconnect when the server is closed
//----------------------

closeDB();

//----------------------
// Run the server
//----------------------

app.listen(PORT, () => {
  return console.log(`Server running at port: ${PORT}`);
});
