import { Request, Response } from "express";
import { grandPrixModel } from "../models";
import { prisma } from "../utils/prisma";

const deleteGrandPrix = async (req: Request, res: Response) => {
  try {
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
          created_at: deletedGrandPrix.created_at,
        },
      });
    } else {
      res.send("No grand prix with that id exists");
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getGrandsPrix = async (req: Request, res: Response) => {
  try {
    const grandsPrix = await grandPrixModel.getAllGrandsPrix();
    res.json(grandsPrix);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getGrandPrixById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const grandPrix = await grandPrixModel.getGrandPrixById(numericId);
    res.json(grandPrix);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const postGrandPrix = async (req: Request, res: Response) => {
  try {
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

    return res.status(201).json({
      message: "Grand prix created successfully",
      grand_prix: grandPrixResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error adding the new grand prix: ${error}`,
      error: error,
    });
  }
};

const putGrandPrix = async (req: Request, res: Response) => {
  try {
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

    return res.status(200).json({
      message: "Grand prix updated successfully",
      grand_prix: grandPrixResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error updating the grand prix: ${error}`,
      error: error,
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
