import { Router } from "express";
import AuthController from "../controllers/auth";

const routes = Router();

routes.post("/", AuthController.auth);

export { routes as AuthRouter };
