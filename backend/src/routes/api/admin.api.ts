import { Router } from "express";
import { adminLogin, getSystemStats } from "../../controllers/admin.controller";
import { adminSignup } from "../../controllers/admin.auth.controller";
import { validateAdminToken } from "../../middlewares/admin-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { adminSignupValidator } from "../../validators/admin.validator";

const router = Router();

router.post("/signup", adminSignupValidator, validateRequest, adminSignup);
router.post("/login", adminLogin);
router.get("/stats", validateAdminToken, getSystemStats);

module.exports = router;