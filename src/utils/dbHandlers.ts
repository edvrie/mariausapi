import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { maxPoolSize: 2 });
  } catch {
    console.log(
      "\x1b[31m",
      "ERROR: Connection to database failed. Exiting...",
      "\x1b[0m"
    );

    process.exit(0);
  }
};

const gracefulExit = async () => {
  console.log("Closing connection to database...");
  await mongoose.connection.close(true);
  console.log("Connection succesfully closed.");
  process.exit(0);
};

const closeDB = () => {
  process
    .on("SIGINT", async () => await gracefulExit())
    .on("SIGTERM", async () => await gracefulExit());
};

export { connectDB, closeDB };
