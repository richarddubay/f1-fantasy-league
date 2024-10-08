import express, { NextFunction, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {
  authRouter,
  choicesRouter,
  driversRouter,
  grandPrixRouter,
  picksRouter,
  playersRouter,
  teamsRouter,
} from "./routers";
import { authMiddleware } from "./middleware/auth";
import { error } from "./middleware/error";
import cors from "cors";

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

/* Auth */
app.use("/auth", authRouter);

/* Auth Middleware */
app.use(authMiddleware);

/* Choices */
app.use("/choice", choicesRouter);

/* Drivers */
app.use("/driver", driversRouter);

/* Grand Prix */
app.use("/grand_prix", grandPrixRouter);

/* Picks */
app.use("/picks", picksRouter);

/* Players */
app.use("/player", playersRouter);

/* Teams */
app.use("/team", teamsRouter);

/* Error Handling Middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  error(err, req, res, next);
});

export default app;
