import { prisma } from "../utils/prisma";
import type { team as Team } from "@prisma/client";

export type TeamType = Omit<
  Team,
  "created_at" | "deleted_at" | "id" | "updated_at"
>;

export const deleteTeam = async (teamId: number) => {
  const deletedTeam = await prisma.team.delete({
    where: {
      id: teamId,
    },
  });
  return deletedTeam;
};

export const getAllTeams = async () => {
  const teams = await prisma.team.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return teams;
};

export const getTeamById = async (teamId: number) => {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
  });
  return team;
};

export const postTeam = async (team: TeamType) => {
  const newTeam = await prisma.team.create({
    data: {
      ...team,
      created_at: new Date(),
    },
  });
  return newTeam;
};

export const putTeam = async (teamId: number, team: TeamType) => {
  const updatedTeam = await prisma.team.update({
    where: {
      id: teamId,
    },
    data: {
      ...team,
      updated_at: new Date(),
    },
  });
  return updatedTeam;
};
