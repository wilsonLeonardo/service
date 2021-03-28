import { Router } from "express";
import UserController from "../controllers/user";

const routes = Router();

routes.get("/", UserController.index);
routes.post("/", UserController.store);

export { routes as UsuarioRouter };
