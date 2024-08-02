import { prisma } from "../utils/prisma";
import type { choices as Choice } from "@prisma/client";

type ChoiceType = Omit<
  Choice,
  "created_at" | "deleted_at" | "id" | "updated_at"
>;

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
      ...choice,
      created_at: new Date(),
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
      updated_at: new Date(),
    },
  });
  return updatedChoice;
};
