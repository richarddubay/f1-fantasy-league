// Drivers Router
import { Router } from "express";
import { param } from "express-validator";
import {
  deleteDriver,
  getDriverById,
  getDrivers,
  postDriver,
  putDriver,
} from "../controllers/drivers";
import { validate } from "../middleware/validate";

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Driver routes
 */
const router = Router();

// DELETE a driver by id
/**
 * @openapi
 * /driver/{id}:
 *   delete:
 *     description: Delete a driver.
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: Returns a string that shows the deleted driver info.
 */
router
  .route("/:id")
  .delete(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    deleteDriver
  );

// GET all drivers
/**
 * @openapi
 * /driver:
 *   get:
 *     description: Get a list of all the drivers.
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: Returns a JSON list of all the drivers.
 */
router.route("/").get(getDrivers);

// GET a driver by id
/**
 * @openapi
 * /driver/{id}:
 *   get:
 *     description: Get the information for a particular driver by their id.
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: Returns the JSON info for a particular driver.
 */
router
  .route("/:id")
  .get(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    getDriverById
  );

// POST a driver (add)
/**
 * @openapi
 * /driver:
 *   post:
 *     description: Creates a new driver.
 *     tags: [Drivers]
 *     responses:
 *       201:
 *         description: Returns the JSON info for the created driver.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router.route("/").post(postDriver);

// PUT a driver (update a driver by id)
/**
 * @openapi
 * /driver:
 *   put:
 *     description: Updates a particular driver by their id.
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: Returns the JSON info for the updated driver.
 *       500:
 *         description: Returns error information if the API calls fails.
 */
router
  .route("/:id")
  .put(
    param("id").isNumeric().withMessage("You need a numeric id"),
    validate,
    putDriver
  );

export default router;
