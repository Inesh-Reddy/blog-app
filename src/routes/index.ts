import express from "express";
export const appRouter = express.Router();

appRouter.route("/");
appRouter.route("/users/:id");
appRouter.route("/posts");
appRouter.route("/posts/:id");
