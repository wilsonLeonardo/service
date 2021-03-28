import express, { Request, NextFunction, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import { routes } from "./routes";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// databse
mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/troc`, {
  useNewUrlParser: true,
});

// rotas
app.get("/", (req, res) =>
  res.send({ running: true, message: "Welcome to CaseTroc" })
);

app.use(routes);

export default app;
