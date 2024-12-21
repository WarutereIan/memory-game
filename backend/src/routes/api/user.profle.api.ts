import { Router } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { validateToken } from "../../middlewares/auth";
import {
  getLeaderBoard,
  getPlayerStats,
  postMultiPlayerGameResults,
  postSinglePlayerGameResults,
} from "../../controllers/user.profile.controller";

const router = Router();

router.post(
  "/singleplayer/result",
  validateRequest,
  validateToken,
  postSinglePlayerGameResults
);
router.post(
  "/multiplayer/result",
  validateRequest,
  validateToken,
  postMultiPlayerGameResults
);

router.get("/player/stats", validateRequest, validateToken, getPlayerStats);

router.get("/leaderboard", validateRequest, getLeaderBoard);

module.exports = router;
