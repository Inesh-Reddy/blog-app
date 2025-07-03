import express from "express";
import { appRouter } from "./routes";
import { connectDB } from "./db";
import { initializeDatabase } from "./models";

const app = express();

app.use(express.json());
app.use("/api/v1/blog-app", appRouter);

(async () => {
  try {
    await connectDB();
    await initializeDatabase();
    app.listen(3000, () => {
      console.log(`✅ Server is listening on port: 3000...`);
    });
  } catch (error) {
    console.log(`unable to connect, please check your code `);
  }
})();
