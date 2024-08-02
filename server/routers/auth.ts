// Choices Router
import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/auth";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth routes
 */
const router = Router();

// POST: Sign in a player
/**
 * @openapi
 * /signin:
 *   post:
 *     description: Signs in a player.
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Returns the JSON info for the signed in player.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router.route("/signin").post(postSignIn);

// POST: Sign up a player (add)
/**
 * @openapi
 * /signup:
 *   post:
 *     description: Creates a new player.
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Returns the JSON info for the created player.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router.route("/signup").post(postSignUp);

export default router;
