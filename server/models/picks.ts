import { prisma } from "../utils/prisma";

type Pick = {
  player_id: number;
  grand_prix_id: number;
  choice_id: number;
  pick_id: number;
  created_at: Date;
};

export const deletePick = async (pickId: number) => {
  const deletedPick = await prisma.picks.delete({
    where: {
      id: pickId,
    },
  });
  return deletedPick;
};

export const getAllPicks = async () => {
  const picks = await prisma.picks.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return picks;
};

export const getPicksByGrandPrixId = async (grandPrixId: number) => {
  const pick = await prisma.picks.findMany({
    where: {
      grand_prix_id: grandPrixId,
    },
  });
  return pick;
};

export const postPick = async (pick: Pick) => {
  try {
    const newPick = await prisma.picks.create({
      data: {
        player_id: pick.player_id,
        grand_prix_id: pick.grand_prix_id,
        choice_id: pick.choice_id,
        pick_id: pick.pick_id,
        created_at: pick.created_at,
      },
    });
    return {
      message: "Success",
      statusCode: 201,
      pick: newPick,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};

export const putPick = async (pickId: number, pick: Pick) => {
  try {
    const updatedPick = await prisma.picks.update({
      where: {
        id: pickId,
      },
      data: {
        ...pick,
      },
    });

    return {
      message: "Success",
      statusCode: 200,
      pick: updatedPick,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};
