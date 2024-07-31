import { prisma } from "../utils/prisma";

type Team = {
  team_name: string;
  created_at: Date;
};

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

export const postTeam = async (team: Team) => {
  try {
    const newTeam = await prisma.team.create({
      data: {
        team_name: team.team_name,
        created_at: team.created_at,
      },
    });
    return {
      message: "Success",
      statusCode: 201,
      team: newTeam,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};

export const putTeam = async (teamId: number, team: Team) => {
  try {
    const updatedTeam = await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        ...team,
      },
    });

    return {
      message: "Success",
      statusCode: 200,
      team: updatedTeam,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};
