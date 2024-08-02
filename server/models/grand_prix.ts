import { prisma } from "../utils/prisma";
// import type { grand_prix as GrandPrix } from "@prisma/client";

// type GrandPrixType = Omit<GrandPrix, "id" | "updated_at" | "deleted_at">;
type GrandPrix =
  | {
      grand_prix_name: string;
      grand_prix_location: string;
      fp1_start: string;
      fp2_start: string;
      fp3_start: string;
      qualifying_start: string;
      race_start: string;
      sprint_qualifying_start: null;
      sprint_race_start: null;
      is_sprint_weekend: boolean;
      circuit_name: string;
      created_at: Date;
    }
  | {
      grand_prix_name: string;
      grand_prix_location: string;
      fp1_start: string;
      fp2_start: null;
      fp3_start: null;
      qualifying_start: string;
      race_start: string;
      sprint_qualifying_start: string;
      sprint_race_start: string;
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
  try {
    const newGrandPrix = await prisma.grand_prix.create({
      data: {
        grand_prix_name: grandPrix.grand_prix_name,
        grand_prix_location: grandPrix.grand_prix_location,
        fp1_start: grandPrix.fp1_start,
        fp2_start: grandPrix.fp2_start,
        fp3_start: grandPrix.fp3_start,
        qualifying_start: grandPrix.qualifying_start,
        race_start: grandPrix.race_start,
        sprint_qualifying_start: grandPrix.sprint_qualifying_start,
        sprint_race_start: grandPrix.sprint_race_start,
        is_sprint_weekend: grandPrix.is_sprint_weekend,
        circuit_name: grandPrix.circuit_name,
        created_at: grandPrix.created_at,
      },
    });
    return {
      message: "Success",
      statusCode: 201,
      grandPrix: newGrandPrix,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};

export const putGrandPrix = async (
  grandPrixId: number,
  grandPrix: GrandPrix
) => {
  try {
    const updatedGrandPrix = await prisma.grand_prix.update({
      where: {
        id: grandPrixId,
      },
      data: {
        ...grandPrix,
      },
    });

    return {
      message: "Success",
      statusCode: 200,
      grandPrix: updatedGrandPrix,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};
