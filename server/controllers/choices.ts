import { Request, Response } from "express";
import { choicesModel } from "../models";
import { prisma } from "../utils/prisma";

const deleteChoiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const choice = await prisma.choices.findUnique({
    where: {
      id: numericId,
    },
  });
  if (choice) {
    const deletedChoice = await choicesModel.deleteChoice(numericId);
    res.json({
      message: "Deleted choice",
      choice: {
        id: deletedChoice.id,
        choice: deletedChoice.choice,
        created_at: deletedChoice.created_at,
      },
    });
  } else {
    res.send("No choice with that id exists");
  }
};

const getChoices = async (req: Request, res: Response) => {
  const choices = await choicesModel.getAllChoices();
  res.json(choices);
};

const getChoiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const choice = await choicesModel.getChoiceById(numericId);
  res.json(choice);
};

const postChoice = async (req: Request, res: Response) => {
  const { choice } = req.body;
  const newChoice = {
    choice,
    created_at: new Date(),
  };

  if (!newChoice.choice) {
    return res.status(400).send("Missing a choice name/title");
  }

  const choiceResponse = await choicesModel.postChoice(newChoice);

  if ("errorMessage" in choiceResponse) {
    console.error(
      `There was an error adding the new choice: ${choiceResponse.errorMessage}`
    );
    return res
      .status(choiceResponse.statusCode)
      .send(
        `There was an error adding the new choice: ${choiceResponse.errorMessage}`
      );
  } else {
    return res.status(choiceResponse.statusCode).json({
      message: "Choice created successfully",
      choice: choiceResponse.choice,
    });
  }
};

const putChoice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const { choice, created_at } = req.body;
  const choiceToUpdate = {
    choice,
    created_at,
  };
  const choiceResponse = await choicesModel.putChoice(
    numericId,
    choiceToUpdate
  );
  if ("errorMessage" in choiceResponse) {
    console.error(
      `There was an error updating the choice: ${choiceResponse.errorMessage}`
    );
    return res
      .status(choiceResponse.statusCode)
      .send(
        `There was an error updating the choice: ${choiceResponse.errorMessage}`
      );
  } else {
    return res.status(choiceResponse.statusCode).json({
      message: "Choice updated successfully",
      choice: choiceResponse.choice,
    });
  }
};

export { deleteChoiceById, getChoices, getChoiceById, postChoice, putChoice };
