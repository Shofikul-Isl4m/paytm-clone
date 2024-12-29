import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { balance,
         transfer,
         } from "../controllers/account.controller.js";



const router = Router();

router.route("/balance").get(verifyJWT,balance)
router.route("/transfer").post(verifyJWT,transfer)


export default router
