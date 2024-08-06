import { Request, Response } from "express";
import { teamsModel } from "../models";

const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const team = await teamsModel.getTeamById(numericId);

    if (team) {
      const deletedTeam = await teamsModel.deleteTeam(numericId);
      res.status(204).json({
        message: "Deleted team",
        team: {
          id: deletedTeam.id,
          team_name: deletedTeam.team_name,
          created_at: deletedTeam.created_at,
        },
      });
    } else {
      res.status(404).send("No team with that id exists");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
        error: "An unknown error occurred.",
      });
    }
  }
};

const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await teamsModel.getAllTeams();
    res.status(200).json(teams);
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
    res.status(200).json(team);
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
