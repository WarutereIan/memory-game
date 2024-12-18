import { Router } from "express";
import { login, signUp } from "../../controllers/user.auth.controller";

const router = Router()

router.post("/signup", signUp)

router.post("/login", login)

module.exports = router