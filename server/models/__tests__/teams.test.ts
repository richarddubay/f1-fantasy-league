import { teamsModel } from "..";
import { prismaForTests } from "../../test-utils/prisma";
import { prisma } from "../../utils/prisma";

jest.mock("@prisma/client");

describe("Teams Model", () => {
  describe("deleteTeam", () => {
    it("should delete a team", async () => {
      // Arrange
      const team = {
        id: 1,
        team_name: "Team Doobie",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      };
      prismaForTests.team = {
        delete: jest.fn().mockResolvedValue(team),
      };

      // Act
      const result = await teamsModel.deleteTeam(1);

      // Assert
      expect(prisma.team.delete).toHaveBeenCalledTimes(1);
      expect(prisma.team.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
        })
      );
      expect(result).toEqual(team);
    });
  });

  describe("getAllTeams", () => {
    it("should get all teams", async () => {
      // Arrange
      const teams = [
        {
          id: 1,
          team_name: "Team Doobie",
          created_at: new Date(),
          updated_at: null,
          deleted_at: null,
        },
        {
          id: 2,
          team_name: "Team Doobie Two",
          created_at: new Date(),
          updated_at: null,
          deleted_at: null,
        },
      ];
      prismaForTests.team = {
        findMany: jest.fn().mockResolvedValue(teams),
      };

      // Act
      const result = await teamsModel.getAllTeams();

      // Assert
      expect(prisma.team.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.team.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: {
            id: "asc",
          },
        })
      );
      expect(result).toEqual(teams);
    });
  });

  describe("getTeamById", () => {
    it("should get a team by id", async () => {
      // Arrange
      const team = {
        id: 1,
        team_name: "Team Doobie",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      };
      prismaForTests.team = {
        findUnique: jest.fn().mockResolvedValue(team),
      };

      // Act
      const result = await teamsModel.getTeamById(1);

      // Assert
      expect(prisma.team.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.team.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
        })
      );
      expect(result).toEqual(team);
    });
  });
});
