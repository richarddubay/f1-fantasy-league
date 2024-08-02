import { prisma } from "../utils/prisma";
import type { picks as Pick } from "@prisma/client";

type PickType = Omit<Pick, "created_at" | "deleted_at" | "id" | "updated_at">;

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

export const postPick = async (pick: PickType) => {
  const newPick = await prisma.picks.create({
    data: {
      ...pick,
      created_at: new Date(),
    },
  });
  return newPick;
};

export const putPick = async (pickId: number, pick: PickType) => {
  const updatedPick = await prisma.picks.update({
    where: {
      id: pickId,
    },
    data: {
      ...pick,
      updated_at: new Date(),
    },
  });
  return updatedPick;
};
