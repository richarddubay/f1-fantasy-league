// Choices Router
import { Router } from "express";
import { param } from "express-validator";
import {
  getChoices,
  getChoiceById,
  deleteChoiceById,
  postChoice,
  putChoice,
} from "../controllers/choices";
import { validate } from "../middleware/validate";

/**
 * @swagger
 * tags:
 *   name: Choices
 *   description: Choice routes
 */
const router = Router();

// DELETE a choice by id
/**
 * @openapi
 * /choice/{id}:
 *   delete:
 *     description: Delete a choice.
 *     tags: [Choices]
 *     responses:
 *       200:
 *         description: Returns a string that shows the deleted choice info.
 */
router
  .route("/:id")
  .delete(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    deleteChoiceById
  );

// GET all choices
/**
 * @openapi
 * /choice:
 *   get:
 *     description: Get a list of all the choices.
 *     tags: [Choices]
 *     responses:
 *       200:
 *         description: Returns a JSON list of all the choices.
 */
router.route("/").get(getChoices);

// GET a choice by id
/**
 * @openapi
 * /choice/{id}:
 *   get:
 *     description: Get the information for a particular choice by it's id.
 *     tags: [Choices]
 *     responses:
 *       200:
 *         description: Returns the JSON info for a particular choice.
 */
router
  .route("/:id")
  .get(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    getChoiceById
  );

// POST a choice (add)
/**
 * @openapi
 * /choice:
 *   post:
 *     description: Creates a new choice.
 *     tags: [Choices]
 *     responses:
 *       201:
 *         description: Returns the JSON info for the created choice.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router.route("/").post(postChoice);

// PUT a choice (update a choice by id)
/**
 * @openapi
 * /choice:
 *   put:
 *     description: Updates a particular choice by its id.
 *     tags: [Choices]
 *     responses:
 *       200:
 *         description: Returns the JSON info for the updated choice.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router
  .route("/:id")
  .put(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    putChoice
  );

export default router;
