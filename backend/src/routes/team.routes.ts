// routes/team.routes.ts

import express from 'express';
import { addTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } from '../controllers/team.controller';
import { upload } from '../middlewares/upload';

const teamRouter = express.Router();

//@ts-ignore
teamRouter.get('/', getAllTeamMembers);
//@ts-ignore
teamRouter.post('/add', upload.single('image'), addTeamMember);
//@ts-ignore
teamRouter.put('/:id', upload.single('image'), updateTeamMember);
//@ts-ignore
teamRouter.delete('/:id', deleteTeamMember);

export default teamRouter;
