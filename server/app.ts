import express from "express";
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
import {
  choicesRouter,
  teamsRouter,
  driversRouter,
  grandPrixRouter,
  picksRouter,
  playersRouter,
} from "./routers";
import { authMiddleware } from "./middleware/auth";
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "F1 Fantasy League",
      version: "1.0.0",
      description:
        "This is the Swagger API documentation for the F1 Fantasy League.",
    },
  },
  apis: ["./routers/*.ts"], // files containing annotations as above
};

const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Choices */
app.use("/choice", choicesRouter);

app.use(authMiddleware);

/* Constructors */
app.use("/constructor", teamsRouter);

/* Drivers */
app.use("/driver", driversRouter);

/* Grand Prix */
app.use("/grand_prix", grandPrixRouter);

/* Picks */
app.use("/picks", picksRouter);

/* Players */
app.use("/player", playersRouter);

export default app;
