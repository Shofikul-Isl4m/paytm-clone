import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware";
import { balance,
         transfer,
         

 } from "../controllers/account.controller";


const router = Router();

router.route("/balance").get(verifyJWT,balance)
router.route("/transfer").get(verifyJWT,transfer)

export default router
