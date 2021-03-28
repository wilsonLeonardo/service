import { Router } from "express";

import { UsuarioRouter } from "./user";
import { AuthRouter } from "./authenticate";

const routes = Router();

routes.use("/user", UsuarioRouter);
routes.use("/auth", AuthRouter);

export { routes };
