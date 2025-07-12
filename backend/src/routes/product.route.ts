import express from 'express';
import { getAllProducts, getSingleProduct } from '../controllers/product.controller';

const productRouter = express.Router();

//@ts-ignore
productRouter.get('/', getAllProducts);
//@ts-ignore
productRouter.get('/:id', getSingleProduct);

export default productRouter;