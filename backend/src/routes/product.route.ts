import express from 'express';
import { getAllProducts, getSingleProduct, incrementProductView } from '../controllers/product.controller';

const productRouter = express.Router();

//@ts-ignore
productRouter.get('/', getAllProducts);
//@ts-ignore
productRouter.get('/:id', getSingleProduct);
productRouter.post('/increment-view/:id', incrementProductView);

export default productRouter;