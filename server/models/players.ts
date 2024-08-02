import { prisma } from "../utils/prisma";
import type { player as Player } from "@prisma/client";

type PlayerType = Pick<Player, "first_name" | "last_name" | "created_at">;

export const deletePlayer = async (playerId: number) => {
  const deletedPlayer = await prisma.player.delete({
    where: {
      id: playerId,
    },
  });
  return deletedPlayer;
};

export const getAllPlayers = async () => {
  const players = await prisma.player.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return players;
};

export const getPlayerById = async (playerId: number) => {
  const player = await prisma.player.findMany({
    where: {
      id: playerId,
    },
  });
  return player;
};

export const postPlayer = async (player: PlayerType) => {
  try {
    const newPlayer = await prisma.player.create({
      data: {
        first_name: player.first_name,
        last_name: player.last_name,
        created_at: player.created_at,
      },
    });
    return {
      message: "Success",
      statusCode: 201,
      player: newPlayer,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};

export const putPlayer = async (playerId: number, player: PlayerType) => {
  try {
    const updatedPlayer = await prisma.player.update({
      where: {
        id: playerId,
      },
      data: {
        ...player,
      },
    });

    return {
      message: "Success",
      statusCode: 200,
      player: updatedPlayer,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};
