import { prisma } from "../utils/prisma";

type Choice = {
  choice: string;
  created_at: Date;
};

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

export const postChoice = async (choice: Choice) => {
  try {
    const newChoice = await prisma.choices.create({
      data: {
        choice: choice.choice,
        created_at: choice.created_at,
      },
    });
    return {
      message: "Success",
      statusCode: 201,
      choice: newChoice,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};

export const putChoice = async (choiceId: number, choice: Choice) => {
  try {
    const updatedChoice = await prisma.choices.update({
      where: {
        id: choiceId,
      },
      data: {
        ...choice,
      },
    });

    return {
      message: "Success",
      statusCode: 200,
      choice: updatedChoice,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};
