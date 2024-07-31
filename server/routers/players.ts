// Players Router
import { Router } from "express";
import { param } from "express-validator";
import {
  deletePlayer,
  getPlayerById,
  getPlayers,
  postPlayer,
  putPlayer,
} from "../controllers/players";
// Could also do this import as:
// import * as playersController from '../controllers/players';
// And then you can use it like:
// router.route("/").get(playersController.getPlayers);
import { validate } from "../middleware/validate";

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Player routes
 */
const router = Router();

// DELETE a player by id
/**
 * @openapi
 * /player/{id}:
 *   delete:
 *     description: Delete a player.
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Returns a string that shows the deleted players id, first name, and last name.
 */
router
  .route("/:id")
  .delete(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    deletePlayer
  );

// GET all players
/**
 * @openapi
 * /player:
 *   get:
 *     description: Get a list of all the players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Returns a JSON list of all the players including id, first name, and last name.
 */
router.route("/").get(getPlayers);

// GET a player by id
/**
 * @openapi
 * /player/{id}:
 *   get:
 *     description: Get the player information for one particular player by id.
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Returns the JSON info for one player including id, first name, and last name.
 */
router
  .route("/:id")
  .get(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    getPlayerById
  );

// POST a player (add)
/**
 * @openapi
 * /player:
 *   post:
 *     description: Creates a new player.
 *     tags: [Players]
 *     responses:
 *       201:
 *         description: Returns the JSON info for the created player including id, first name, and last name.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router.route("/").post(postPlayer);

// PUT a player (update a player by id)
/**
 * @openapi
 * /player:
 *   put:
 *     description: Updates a particular player by their id.
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Returns the JSON info for the updated player including id, first name, and last name.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router
  .route("/:id")
  .put(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    putPlayer
  );

export default router;
