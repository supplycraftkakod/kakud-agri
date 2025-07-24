import express from "express";
import { subscribeToNewsLetter } from "../controllers/subscribe..controller";

const subscribeRouter = express.Router();

//@ts-ignore
subscribeRouter.post("/", subscribeToNewsLetter)

export default subscribeRouter;