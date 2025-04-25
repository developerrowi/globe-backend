import * as express from 'express'
import productsRouter from './product'
import userRouter from './user'

let router = express.Router();


router.use('/api', userRouter);
router.use('/api', productsRouter);

export default router
