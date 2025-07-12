import express, { RequestHandler } from 'express';
import { upload } from '../middlewares/upload';
import { deleteBanner, getAllBanners, getVisibleBanners, toggleVisibility, uploadBanners } from '../controllers/banners.controller';


const bannersRouter = express.Router();

//@ts-ignore
bannersRouter.post("/upload", upload.array("images", 10) as RequestHandler, uploadBanners);
bannersRouter.patch("/visibility/:id", toggleVisibility);
bannersRouter.delete("/:id", deleteBanner);
bannersRouter.get("/", getAllBanners);
bannersRouter.get("/visible", getVisibleBanners);

export default bannersRouter;
