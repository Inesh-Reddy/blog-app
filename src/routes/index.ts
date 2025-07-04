import express from "express";
import { register } from "../controllers/register";
import { login } from "../controllers/login";
const appRouter = express.Router();

appRouter.route("/register").post(register);
appRouter.route("/login").post(login);
// appRouter.route("/users/:id").get();
// appRouter.route("/posts").post().get();
// appRouter.route("/posts/:id").get().put().delete();
// appRouter.route("/posts/:id/comments").get().post();

export { appRouter };
