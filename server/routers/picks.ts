// Picks Router
import { Router } from "express";
import { param } from "express-validator";
import {
  deletePick,
  getPicksByGrandPrixId,
  getPicks,
  postPick,
  putPick,
} from "../controllers/picks";
import { validate } from "../middleware/validate";

/**
 * @swagger
 * tags:
 *   name: Picks
 *   description: Pick routes
 */
const router = Router();

// DELETE a pick by id
/**
 * @openapi
 * /pick/{id}:
 *   delete:
 *     description: Delete a pick.
 *     tags: [Picks]
 *     responses:
 *       200:
 *         description: Returns a string that shows the deleted pick with all it's info.
 */
router
  .route("/:id")
  .delete(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    deletePick
  );

// GET all picks (NOT SURE WHY YOU'D REALLY WANT TO DO THIS)
/**
 * @openapi
 * /pick:
 *   get:
 *     description: Get a list of all the picks
 *     tags: [Picks]
 *     responses:
 *       200:
 *         description: Returns a JSON list of all the picks including id, player_id, grand_prix_id, choice_id, and pick_id.
 */
router.route("/").get(getPicks);

// GET a pick by grand_prix id (all picks for that particular grand prix)
/**
 * @openapi
 * /pick/{id}:
 *   get:
 *     description: Get all picks for a particular grand prix.
 *     tags: [Picks]
 *     responses:
 *       200:
 *         description: Returns the JSON info for all the picks for a particular grand prix.
 */
router
  .route("/grand_prix/:id")
  .get(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    getPicksByGrandPrixId
  );

// POST a pick (add)
/**
 * @openapi
 * /pick:
 *   post:
 *     description: Creates a new pick.
 *     tags: [Picks]
 *     responses:
 *       201:
 *         description: Returns the JSON info for the created pick.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router.route("/").post(postPick);

// PUT a pick (update a pick by id)
/**
 * @openapi
 * /pick:
 *   put:
 *     description: Updates a particular pick by its id.
 *     tags: [Picks]
 *     responses:
 *       200:
 *         description: Returns the JSON info for the updated pick.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router
  .route("/:id")
  .put(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    putPick
  );

export default router;
