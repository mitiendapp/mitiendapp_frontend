import { Router } from "express";
import { createProduct } from "../controllers/product.controller";

const router = Router()

router.get('/hola', (req,res)=>{
    res.send
})

router.post('/createProduct', createProduct)


export default router