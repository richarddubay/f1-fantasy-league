import { Request, Response } from "express";
import { playersModel } from "../models";
import { prisma } from "../utils/prisma";

const deletePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const player = await prisma.player.findUnique({
      where: {
        id: numericId,
      },
    });
    if (player) {
      const deletedPlayer = await playersModel.deletePlayer(numericId);
      res.json({
        message: "Deleted player",
        player: {
          id: deletedPlayer.id,
          first_name: deletedPlayer.first_name,
          last_name: deletedPlayer.last_name,
          identifier: deletedPlayer.identifier,
          created_at: deletedPlayer.created_at,
        },
      });
    } else {
      res.send("No player with that id exists");
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getPlayers = async (req: Request, res: Response) => {
  try {
    const players = await playersModel.getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getPlayerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const player = await playersModel.getPlayerById(numericId);
    res.json(player);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const postPlayer = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, identifier, password } = req.body;
    const newPlayer = {
      first_name,
      last_name,
      identifier,
      password,
    };

    if (!newPlayer.first_name || !newPlayer.last_name) {
      return res.status(400).send("A player needs a first and last name.");
    }

    const playerResponse = await playersModel.postPlayer(newPlayer);

    return res.status(201).json({
      message: "Player created successfully",
      player: playerResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error adding the new player: ${error}`,
      error: error,
    });
  }
};

const putPlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const { first_name, last_name, identifier, password } = req.body;

    const playerToUpdate = {
      first_name,
      last_name,
      identifier,
      password,
    };

    const playerResponse = await playersModel.putPlayer(
      numericId,
      playerToUpdate
    );

    return res.status(200).json({
      message: "Player updated successfully",
      player: playerResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error updating the player: ${error}`,
      error: error,
    });
  }
};

export { deletePlayer, getPlayers, getPlayerById, postPlayer, putPlayer };
