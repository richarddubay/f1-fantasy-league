import { Request, Response } from "express";
import { teamsModel } from "../models";
import { prisma } from "../utils/prisma";

const deleteTeam = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await teamsModel.getAllTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const team = await teamsModel.getTeamById(numericId);
    res.json(team);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const postTeam = async (req: Request, res: Response) => {
  try {
    const { team_name } = req.body;
    const newTeam = {
      team_name,
    };

    if (!newTeam.team_name) {
      return res.status(400).send("A team needs a team name");
    }

    const teamResponse = await teamsModel.postTeam(newTeam);

    return res.status(201).json({
      message: "Team created successfully",
      team: teamResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error adding the new team: ${error}`,
      error: error,
    });
  }
};

const putTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const { team_name } = req.body;

    const teamToUpdate = {
      team_name,
    };

    const teamResponse = await teamsModel.putTeam(numericId, teamToUpdate);

    return res.status(200).json({
      message: "Team updated successfully",
      team: teamResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error updating the team: ${error}`,
      error: error,
    });
  }
};

export { deleteTeam, getTeams, getTeamById, postTeam, putTeam };
