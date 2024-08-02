import { prisma } from "../utils/prisma";
import type { choices as Choice } from "@prisma/client";

type ChoiceType = Pick<Choice, "choice" | "created_at">;

export const deleteChoice = async (choiceId: number) => {
  const deletedChoice = await prisma.choices.delete({
    where: {
      id: choiceId,
    },
  });
  return deletedChoice;
};

export const getAllChoices = async () => {
  const choices = await prisma.choices.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return choices;
};

export const getChoiceById = async (choiceId: number) => {
  const choice = await prisma.choices.findUnique({
    where: {
      id: choiceId,
    },
  });
  return choice;
};

export const postChoice = async (choice: ChoiceType) => {
  const newChoice = await prisma.choices.create({
    data: {
      choice: choice.choice,
      created_at: choice.created_at,
    },
  });
  return newChoice;
};

export const putChoice = async (choiceId: number, choice: ChoiceType) => {
  const updatedChoice = await prisma.choices.update({
    where: {
      id: choiceId,
    },
    data: {
      ...choice,
      created_at: choice.created_at ? new Date(choice.created_at) : undefined,
    },
  });
  return updatedChoice;
};
