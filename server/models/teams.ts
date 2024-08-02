import { prisma } from "../utils/prisma";
import type { team as Team } from "@prisma/client";

type TeamType = Pick<Team, "team_name" | "created_at">;

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
  const team = await prisma.team.findMany({
    where: {
      id: teamId,
    },
  });
  return team;
};

export const postTeam = async (team: TeamType) => {
  const newTeam = await prisma.team.create({
    data: {
      team_name: team.team_name,
      created_at: team.created_at,
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
    },
  });
  return updatedTeam;
};
