// Teams Router
import { Router } from "express";
import { param } from "express-validator";
import {
  deleteTeam,
  getTeamById,
  getTeams,
  postTeam,
  putTeam,
} from "../controllers/teams";
import { validate } from "../middleware/validate";

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Teams routes
 */
const router = Router();

// DELETE a team by id
/**
 * @openapi
 * /team/{id}:
 *   delete:
 *     description: Delete a team.
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Returns a string that shows the deleted team info.
 */
router
  .route("/:id")
  .delete(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    deleteTeam
  );

// GET all teams
/**
 * @openapi
 * /team:
 *   get:
 *     description: Get a list of all the teams.
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Returns a JSON list of all the teams.
 */
router.route("/").get(getTeams);

// GET a team by id
/**
 * @openapi
 * /team/{id}:
 *   get:
 *     description: Get the information for a particular team by it's id.
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Returns the JSON info for a particular team.
 */
router
  .route("/:id")
  .get(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    getTeamById
  );

// POST a team (add)
/**
 * @openapi
 * /team:
 *   post:
 *     description: Creates a new team.
 *     tags: [Teams]
 *     responses:
 *       201:
 *         description: Returns the JSON info for the created team.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router.route("/").post(postTeam);

// PUT a team (update a team by id)
/**
 * @openapi
 * /team/{id}:
 *   put:
 *     description: Updates a particular team by its id.
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Returns the JSON info for the updated team.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router
  .route("/:id")
  .put(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    putTeam
  );

export default router;
