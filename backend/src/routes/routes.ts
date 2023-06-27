import { Router } from "express";
import { createClient } from "../controllers/client.controller";
import { registerUser } from "../controllers/user.controller";
import passport from "passport";
import { verifyRoles } from "../middlewares/verifyRoles";
import ROLES_LIST from "../../config/role.list";
import { loginTest, loginUser } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/verifyJWT";
import { createProduct, getProductById, getProducts } from "../controllers/product.controller";

const router = Router();


router.post('/createClient', createClient)

// User routes
router.post('/user/register', registerUser);

router.post('/user/login', loginUser);

// Product routes

router.get('/product', getProducts);
router.get('/test/', getProductById);
router.post('/product', createProduct)


router.get('/test', passport.authenticate("jwt", { session: false }), loginTest);
router.get('/test2',verifyJWT, verifyRoles(ROLES_LIST.Admin) , loginTest);

export default router; 