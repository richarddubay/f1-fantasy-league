import { Request, Response } from "express";
import { playersModel } from "../models";
import { prisma } from "../utils/prisma";

const deletePlayer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const player = await prisma.player.findUnique({
    where: {
      id: numericId,
    },
  });
  if (player) {
    const deletedPlayer = await playersModel.deletePlayer(numericId);
    res.send(
      `Deleted player ${deletedPlayer.id}: ${deletedPlayer.first_name} ${deletedPlayer.last_name}`
    );
    res.json({
      message: "Deleted player",
      pick: {
        id: deletedPlayer.id,
        first_name: deletedPlayer.first_name,
        last_name: deletedPlayer.last_name,
        created_at: deletedPlayer.created_at,
      },
    });
  } else {
    res.send("No player with that id exists");
  }
};

const getPlayers = async (req: Request, res: Response) => {
  const players = await playersModel.getAllPlayers();
  res.json(players);
};

const getPlayerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const player = await playersModel.getPlayerById(numericId);
  res.json(player);
};

const postPlayer = async (req: Request, res: Response) => {
  const { first_name, last_name } = req.body;
  const newPlayer = {
    first_name,
    last_name,
    created_at: new Date(),
  };

  if (!newPlayer.first_name || !newPlayer.last_name) {
    return res.status(400).send("A player needs a first and last name.");
  }

  const playerResponse = await playersModel.postPlayer(newPlayer);

  if ("errorMessage" in playerResponse) {
    console.error(
      `There was an error adding the new player: ${playerResponse.errorMessage}`
    );
    return res
      .status(playerResponse.statusCode)
      .send(
        `There was an error adding the new player: ${playerResponse.errorMessage}`
      );
  } else {
    return res.status(playerResponse.statusCode).json({
      message: "Player created successfully",
      player: playerResponse.player,
    });
  }
};

const putPlayer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const { first_name, last_name, created_at } = req.body;

  const playerToUpdate = {
    first_name,
    last_name,
    created_at,
  };

  const playerResponse = await playersModel.putPlayer(
    numericId,
    playerToUpdate
  );

  if ("errorMessage" in playerResponse) {
    console.error(
      `There was an error updating the player: ${playerResponse.errorMessage}`
    );
    return res
      .status(playerResponse.statusCode)
      .send(
        `There was an error updating the player: ${playerResponse.errorMessage}`
      );
  } else {
    return res.status(playerResponse.statusCode).json({
      message: "Player updated successfully",
      player: playerResponse.player,
    });
  }
};

export { deletePlayer, getPlayers, getPlayerById, postPlayer, putPlayer };
