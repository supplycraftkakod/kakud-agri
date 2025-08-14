import express from 'express';
import { upload } from '../middlewares/upload';
import { createEvent, deleteEventById, getAllEvents, getEventById } from '../controllers/event.controller';

const eventRuter = express.Router();

//@ts-ignore
eventRuter.post("/create", upload.fields([{ name: "heroImage", maxCount: 1 }, { name: "speakerImages", maxCount: 10 },]), createEvent);
eventRuter.get('/', getAllEvents);
//@ts-ignore
eventRuter.get("/:id", getEventById);
//@ts-ignore
eventRuter.delete("/:id", deleteEventById);



export default eventRuter;
