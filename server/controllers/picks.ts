import { Request, Response } from "express";
import { picksModel } from "../models";
import { prisma } from "../utils/prisma";

const deletePick = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const pick = await prisma.picks.findUnique({
      where: {
        id: numericId,
      },
    });
    if (pick) {
      const deletedPick = await picksModel.deletePick(numericId);
      res.json({
        message: "Deleted pick",
        pick: {
          id: deletedPick.id,
          player_id: deletedPick.player_id,
          grand_prix_id: deletedPick.grand_prix_id,
          choice_id: deletedPick.choice_id,
          pick_id: deletedPick.pick_id,
          created_at: deletedPick.created_at,
        },
      });
    } else {
      res.send("No pick with that id exists");
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getPicks = async (req: Request, res: Response) => {
  try {
    const picks = await picksModel.getAllPicks();
    res.json(picks);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getPicksByGrandPrixId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const pick = await picksModel.getPicksByGrandPrixId(numericId);
    res.json(pick);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const postPick = async (req: Request, res: Response) => {
  try {
    const { player_id, grand_prix_id, choice_id, pick_id } = req.body;
    const newPick = {
      player_id,
      grand_prix_id,
      choice_id,
      pick_id,
      created_at: new Date(),
    };

    if (
      !newPick.player_id ||
      !newPick.grand_prix_id ||
      !newPick.choice_id ||
      !newPick.pick_id
    ) {
      return res.status(400).send("Missing items needed to create a pick");
    }

    const pickResponse = await picksModel.postPick(newPick);

    return res.status(201).json({
      message: "Pick created successfully",
      pick: pickResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error adding the new pick: ${error}`,
      error: error,
    });
  }
};

const putPick = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const { player_id, grand_prix_id, choice_id, pick_id, created_at } =
      req.body;

    const pickToUpdate = {
      player_id,
      grand_prix_id,
      choice_id,
      pick_id,
      created_at,
    };

    const pickResponse = await picksModel.putPick(numericId, pickToUpdate);

    return res.status(200).json({
      message: "Pick updated successfully",
      pick: pickResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error updating the pick: ${error}`,
      error: error,
    });
  }
};

export { deletePick, getPicks, getPicksByGrandPrixId, postPick, putPick };
