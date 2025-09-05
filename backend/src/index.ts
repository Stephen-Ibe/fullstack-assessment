import config from "config";
import express, { Application, NextFunction, Request, Response } from "express";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";
const port = config.get("port") as number;

const app: Application = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// Centralized error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  // Fallback error handling for uncaught errors
  console.error("Unhandled error:", err);
  res.status(500).send({ error: "Internal Server Error" });
});

export default app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
  });
}
