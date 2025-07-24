import express from "express";
import { addJobRole, deleteJobRole, getAllJobRoles } from "../controllers/jobrole.controller";

const jobRoleRouter = express.Router();

jobRoleRouter.get("/", getAllJobRoles);
//@ts-ignoreD
jobRoleRouter.post("/", addJobRole);
jobRoleRouter.delete("/:id", deleteJobRole);

export default jobRoleRouter;