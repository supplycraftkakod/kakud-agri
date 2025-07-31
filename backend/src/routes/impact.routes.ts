import express from "express";
import { createImpactStat, deleteImpactStat, getAllImpactStats, updateImpactStat } from "../controllers/impact.controller";
import { upload } from "../middlewares/upload";

const impactRouter = express.Router();

//@ts-ignore
impactRouter.get("/", getAllImpactStats);
//@ts-ignore
impactRouter.post("/", upload.single("image"), createImpactStat);
//@ts-ignore
impactRouter.put("/:id", upload.single("image"), updateImpactStat);
//@ts-ignore
impactRouter.delete("/:id", deleteImpactStat);


export default impactRouter;
