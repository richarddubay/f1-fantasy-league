import { prisma } from "../utils/prisma";
// import type { grand_prix as GrandPrix } from "@prisma/client";

// type GrandPrixType = Omit<GrandPrix, "id" | "updated_at" | "deleted_at">;
type GrandPrix =
  | {
      grand_prix_name: string;
      grand_prix_location: string;
      fp1_start: Date;
      fp2_start: Date;
      fp3_start: Date;
      qualifying_start: Date;
      race_start: Date;
      sprint_qualifying_start: null;
      sprint_race_start: null;
      is_sprint_weekend: boolean;
      circuit_name: string;
      created_at: Date;
    }
  | {
      grand_prix_name: string;
      grand_prix_location: string;
      fp1_start: Date;
      fp2_start: null;
      fp3_start: null;
      qualifying_start: Date;
      race_start: Date;
      sprint_qualifying_start: Date;
      sprint_race_start: Date;
      is_sprint_weekend: boolean;
      circuit_name: string;
      created_at: Date;
    };

export const deleteGrandPrix = async (grandPrixId: number) => {
  const deletedGrandPrix = await prisma.grand_prix.delete({
    where: {
      id: grandPrixId,
    },
  });
  return deletedGrandPrix;
};

export const getAllGrandsPrix = async () => {
  const grandsPrix = await prisma.grand_prix.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return grandsPrix;
};

export const getGrandPrixById = async (grandPrixId: number) => {
  const grandPrix = await prisma.grand_prix.findUnique({
    where: {
      id: grandPrixId,
    },
  });
  return grandPrix;
};

export const postGrandPrix = async (grandPrix: GrandPrix) => {
  const newGrandPrix = await prisma.grand_prix.create({
    data: {
      grand_prix_name: grandPrix.grand_prix_name,
      grand_prix_location: grandPrix.grand_prix_location,
      fp1_start: new Date(grandPrix.fp1_start),
      fp2_start: grandPrix.fp2_start ? new Date(grandPrix.fp2_start) : null,
      fp3_start: grandPrix.fp3_start ? new Date(grandPrix.fp3_start) : null,
      qualifying_start: new Date(grandPrix.qualifying_start),
      race_start: new Date(grandPrix.race_start),
      sprint_qualifying_start: grandPrix.sprint_qualifying_start
        ? new Date(grandPrix.sprint_qualifying_start)
        : null,
      sprint_race_start: grandPrix.sprint_race_start
        ? new Date(grandPrix.sprint_race_start)
        : null,
      is_sprint_weekend: grandPrix.is_sprint_weekend,
      circuit_name: grandPrix.circuit_name,
      created_at: grandPrix.created_at,
    },
  });
  return newGrandPrix;
};

export const putGrandPrix = async (
  grandPrixId: number,
  grandPrix: GrandPrix
) => {
  const updatedGrandPrix = await prisma.grand_prix.update({
    where: {
      id: grandPrixId,
    },
    data: {
      ...grandPrix,
      fp1_start: grandPrix.fp1_start
        ? new Date(grandPrix.fp1_start)
        : undefined,
      fp2_start: grandPrix.fp2_start
        ? new Date(grandPrix.fp2_start)
        : undefined,
      fp3_start: grandPrix.fp3_start
        ? new Date(grandPrix.fp3_start)
        : undefined,
      qualifying_start: grandPrix.qualifying_start
        ? new Date(grandPrix.qualifying_start)
        : undefined,
      race_start: grandPrix.race_start
        ? new Date(grandPrix.race_start)
        : undefined,
      sprint_qualifying_start: grandPrix.sprint_qualifying_start
        ? new Date(grandPrix.sprint_qualifying_start)
        : undefined,
      sprint_race_start: grandPrix.sprint_race_start
        ? new Date(grandPrix.sprint_race_start)
        : undefined,
      created_at: grandPrix.created_at
        ? new Date(grandPrix.created_at)
        : undefined,
    },
  });
  return updatedGrandPrix;
};
