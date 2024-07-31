import { Request, Response } from "express";
import { grandPrixModel } from "../models";
import { prisma } from "../utils/prisma";

const deleteGrandPrix = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const grandPrix = await prisma.grand_prix.findUnique({
    where: {
      id: numericId,
    },
  });
  if (grandPrix) {
    const deletedGrandPrix = await grandPrixModel.deleteGrandPrix(numericId);
    res.json({
      message: "Deleted grand prix",
      pick: {
        id: deletedGrandPrix.id,
        grand_prix_name: deletedGrandPrix.grand_prix_name,
        grand_prix_location: deletedGrandPrix.grand_prix_location,
        fp1_start: deletedGrandPrix.fp1_start,
        fp2_start: deletedGrandPrix.fp2_start,
        fp3_start: deletedGrandPrix.fp3_start,
        qualifying_start: deletedGrandPrix.qualifying_start,
        race_start: deletedGrandPrix.race_start,
        sprint_qualifying_start: deletedGrandPrix.sprint_qualifying_start,
        sprint_race_start: deletedGrandPrix.sprint_race_start,
        is_sprint_weekend: deletedGrandPrix.is_sprint_weekend,
        circuit_name: deletedGrandPrix.circuit_name,
        created_st: deletedGrandPrix.created_at,
      },
    });
  } else {
    res.send("No grand prix with that id exists");
  }
};

const getGrandsPrix = async (req: Request, res: Response) => {
  const grandsPrix = await grandPrixModel.getAllGrandsPrix();
  res.json(grandsPrix);
};

const getGrandPrixById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const grandPrix = await grandPrixModel.getGrandPrixById(numericId);
  res.json(grandPrix);
};

const postGrandPrix = async (req: Request, res: Response) => {
  const {
    grand_prix_name,
    grand_prix_location,
    fp1_start,
    fp2_start,
    fp3_start,
    qualifying_start,
    race_start,
    sprint_qualifying_start,
    sprint_race_start,
    is_sprint_weekend,
    circuit_name,
  } = req.body;

  const newGrandPrix = {
    grand_prix_name,
    grand_prix_location,
    fp1_start,
    fp2_start,
    fp3_start,
    qualifying_start,
    race_start,
    sprint_qualifying_start,
    sprint_race_start,
    is_sprint_weekend,
    circuit_name,
    created_at: new Date(),
  };

  if (
    !newGrandPrix.grand_prix_name ||
    !newGrandPrix.grand_prix_location ||
    !newGrandPrix.fp1_start ||
    !newGrandPrix.qualifying_start ||
    !newGrandPrix.race_start ||
    !newGrandPrix.circuit_name
  ) {
    return res.status(400).send("Not enough data to create a grand prix");
  }

  const grandPrixResponse = await grandPrixModel.postGrandPrix(newGrandPrix);

  if ("errorMessage" in grandPrixResponse) {
    console.error(
      `There was an error adding the new grand prix: ${grandPrixResponse.errorMessage}`
    );
    return res
      .status(grandPrixResponse.statusCode)
      .send(
        `There was an error adding the new grand prix: ${grandPrixResponse.errorMessage}`
      );
  } else {
    return res.status(grandPrixResponse.statusCode).json({
      message: "Grand prix created successfully",
      grand_prix: grandPrixResponse.grandPrix,
    });
  }
};

const putGrandPrix = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const {
    grand_prix_name,
    grand_prix_location,
    fp1_start,
    fp2_start,
    fp3_start,
    qualifying_start,
    race_start,
    sprint_qualifying_start,
    sprint_race_start,
    is_sprint_weekend,
    circuit_name,
    created_at,
  } = req.body;

  const grandPrixToUpdate = {
    grand_prix_name,
    grand_prix_location,
    fp1_start,
    fp2_start,
    fp3_start,
    qualifying_start,
    race_start,
    sprint_qualifying_start,
    sprint_race_start,
    is_sprint_weekend,
    circuit_name,
    created_at,
  };

  const grandPrixResponse = await grandPrixModel.putGrandPrix(
    numericId,
    grandPrixToUpdate
  );

  if ("errorMessage" in grandPrixResponse) {
    console.error(
      `There was an error updating the grand prix: ${grandPrixResponse.errorMessage}`
    );
    return res
      .status(grandPrixResponse.statusCode)
      .send(
        `There was an error updating the grand prix: ${grandPrixResponse.errorMessage}`
      );
  } else {
    return res.status(grandPrixResponse.statusCode).json({
      message: "Grand prix updated successfully",
      grand_prix: grandPrixResponse.grandPrix,
    });
  }
};

export {
  deleteGrandPrix,
  getGrandsPrix,
  getGrandPrixById,
  postGrandPrix,
  putGrandPrix,
};
