import { prisma } from "../utils/prisma";
import type { player as Player } from "@prisma/client";

type PlayerType = Omit<
  Player,
  "created_at" | "deleted_at" | "id" | "updated_at"
>;

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
    select: {
      id: true,
      first_name: true,
      last_name: true,
      identifier: true,
      created_at: true,
      deleted_at: true,
      updated_at: true,
    },
  });
  return players;
};

export const getPlayerById = async (playerId: number) => {
  const player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });
  return player;
};

export const postPlayer = async (player: PlayerType) => {
  const newPlayer = await prisma.player.create({
    data: {
      ...player,
      created_at: new Date(),
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      identifier: true,
      password: true,
      created_at: true,
    },
  });
  return newPlayer;
};

export const putPlayer = async (playerId: number, player: PlayerType) => {
  const updatedPlayer = await prisma.player.update({
    where: {
      id: playerId,
    },
    data: {
      ...player,
      updated_at: new Date(),
    },
  });
  return updatedPlayer;
};
