import {Router} from "express"
import { 
    findUser,
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser

 } from "../controllers/user.controller.js"
 import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/bulk").get(verifyJWT,findUser)


export default router
