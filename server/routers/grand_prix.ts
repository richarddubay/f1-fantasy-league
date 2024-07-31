// Grand Prix Router
import { Router } from "express";
import { param } from "express-validator";
import {
  deleteGrandPrix,
  getGrandPrixById,
  getGrandsPrix,
  postGrandPrix,
  putGrandPrix,
} from "../controllers/grand_prix";
import { validate } from "../middleware/validate";

/**
 * @swagger
 * tags:
 *   name: Grand Prix
 *   description: Grand Prix routes
 */
const router = Router();

// DELETE a grand prix by id
/**
 * @openapi
 * /grand_prix/{id}:
 *   delete:
 *     description: Delete a grand prix.
 *     tags: [Grand Prix]
 *     responses:
 *       200:
 *         description: Returns a string that shows the deleted grand prix info.
 */
router
  .route("/:id")
  .delete(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    deleteGrandPrix
  );

// GET all grands prix
/**
 * @openapi
 * /grand_prix:
 *   get:
 *     description: Get a list of all the grands prix.
 *     tags: [Grand Prix]
 *     responses:
 *       200:
 *         description: Returns a JSON list of all the grands prix.
 */
router.route("/").get(getGrandsPrix);

// GET a grand prix by id
/**
 * @openapi
 * /grand_prix/{id}:
 *   get:
 *     description: Get the information for a particular grand prix by it's id.
 *     tags: [Grand Prix]
 *     responses:
 *       200:
 *         description: Returns the JSON info for a particular grand prix.
 */
router
  .route("/:id")
  .get(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    getGrandPrixById
  );

// POST a grand prix (add)
/**
 * @openapi
 * /grand_prix:
 *   post:
 *     description: Creates a new grand prix.
 *     tags: [Grand Prix]
 *     responses:
 *       201:
 *         description: Returns the JSON info for the created grand prix.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router.route("/").post(postGrandPrix);

// PUT a grand prix (update a grand prix by id)
/**
 * @openapi
 * /grand_prix:
 *   put:
 *     description: Updates a particular grand_prix by its id.
 *     tags: [Grand Prix]
 *     responses:
 *       200:
 *         description: Returns the JSON info for the updated grand prix.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router
  .route("/:id")
  .put(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    putGrandPrix
  );

export default router;
