import { Request, Response } from "express";
import { teamsModel } from "../models";
import { prisma } from "../utils/prisma";

const deleteTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const team = await prisma.team.findUnique({
    where: {
      id: numericId,
    },
  });
  if (team) {
    const deletedTeam = await teamsModel.deleteTeam(numericId);
    res.send(`Deleted team ${deletedTeam.id}: ${deletedTeam.team_name}`);
    res.json({
      message: "Deleted team",
      pick: {
        id: deletedTeam.id,
        team_name: deletedTeam.team_name,
        created_at: deletedTeam.created_at,
      },
    });
  } else {
    res.send("No team with that id exists");
  }
};

const getTeams = async (req: Request, res: Response) => {
  const teams = await teamsModel.getAllTeams();
  res.json(teams);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const team = await teamsModel.getTeamById(numericId);
  res.json(team);
};

const postTeam = async (req: Request, res: Response) => {
  const { team_name } = req.body;
  const newTeam = {
    team_name,
    created_at: new Date(),
  };

  if (!newTeam.team_name) {
    return res.status(400).send("A team needs a team name");
  }

  const teamResponse = await teamsModel.postTeam(newTeam);

  if ("errorMessage" in teamResponse) {
    console.error(
      `There was an error adding the new team: ${teamResponse.errorMessage}`
    );
    return res
      .status(teamResponse.statusCode)
      .send(
        `There was an error adding the new team: ${teamResponse.errorMessage}`
      );
  } else {
    return res.status(teamResponse.statusCode).json({
      message: "Team created successfully",
      team: teamResponse.team,
    });
  }
};

const putTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const { team_name, created_at } = req.body;

  const teamToUpdate = {
    team_name,
    created_at,
  };

  const teamResponse = await teamsModel.putTeam(numericId, teamToUpdate);

  if ("errorMessage" in teamResponse) {
    console.error(
      `There was an error updating the team: ${teamResponse.errorMessage}`
    );
    return res
      .status(teamResponse.statusCode)
      .send(
        `There was an error updating the team: ${teamResponse.errorMessage}`
      );
  } else {
    return res.status(teamResponse.statusCode).json({
      message: "Team updated successfully",
      team: teamResponse.team,
    });
  }
};

export { deleteTeam, getTeams, getTeamById, postTeam, putTeam };
