import { Request, Response } from "express";
import { choicesModel } from "../models";
import { prisma } from "../utils/prisma";

const deleteChoiceById = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getChoices = async (req: Request, res: Response) => {
  try {
    const choices = await choicesModel.getAllChoices();
    res.json(choices);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getChoiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const choice = await choicesModel.getChoiceById(numericId);
    res.json(choice);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const postChoice = async (req: Request, res: Response) => {
  try {
    const { choice } = req.body;
    const newChoice = {
      choice,
    };

    if (!newChoice.choice) {
      return res.status(400).send("Missing a choice name/title");
    }

    const choiceResponse = await choicesModel.postChoice(newChoice);

    return res.status(201).json({
      message: "Choice created successfully",
      choice: choiceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error adding the new choice: ${error}`,
      error: error,
    });
  }
};

const putChoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const { choice } = req.body;

    const choiceToUpdate = {
      choice,
    };

    const choiceResponse = await choicesModel.putChoice(
      numericId,
      choiceToUpdate
    );

    return res.status(200).json({
      message: "Choice updated successfully",
      choice: choiceResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error updating the choice: ${error}`,
      error: error,
    });
  }
};

export { deleteChoiceById, getChoices, getChoiceById, postChoice, putChoice };
