import { teamsModel } from "../../models";
import { mockRequest, mockResponse } from "../../test-utils/mockRequest";
import { deleteTeam } from "../teams";
import { when } from "jest-when";

jest.mock("../../models/teams");

describe("Teams Controller", () => {
  describe("deleteTeam", () => {
    it("should delete a team when a valid team id is provided", async () => {
      // Arrange
      const req = mockRequest({ params: { id: 1 } });
      const res = mockResponse();

      const mockTeam = {
        id: 1,
        team_name: "Team Doobie",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      };

      when(teamsModel.getTeamById).calledWith(1).mockResolvedValue(mockTeam);
      when(teamsModel.deleteTeam).calledWith(1).mockResolvedValue(mockTeam);

      // Act
      await deleteTeam(req, res);

      // Assert
      expect(teamsModel.deleteTeam).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        message: "Deleted team",
        team: {
          id: mockTeam.id,
          team_name: mockTeam.team_name,
          created_at: mockTeam.created_at,
        },
      });
    });

    it("should return a message if the team does not exist", async () => {
      // Arrange
      const req = mockRequest({ params: { id: 1 } });
      const res = mockResponse();

      when(teamsModel.getTeamById).calledWith(1).mockResolvedValue(null);

      // Act
      await deleteTeam(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("No team with that id exists");
    });

    it("should return a 500 error with a specific error message if something goes wrong", async () => {
      // Arrange
      const req = mockRequest({ params: { id: 1 } });
      const res = mockResponse();

      const errorMessage = "You found an error! Congratulations!";
      when(teamsModel.getTeamById)
        .calledWith(1)
        .mockResolvedValue(Promise.reject(new Error(errorMessage)));

      // Act
      await deleteTeam(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        error: errorMessage,
      });
    });

    it("should return a 500 error with a generic error message if something that isn't an error goes wrong", async () => {
      // Arrange
      const req = mockRequest({ params: { id: 1 } });
      const res = mockResponse();

      when(teamsModel.getTeamById)
        .calledWith(1)
        .mockResolvedValue(Promise.reject("Unexpected Error"));

      // Act
      await deleteTeam(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        error: "An unknown error occurred.",
      });
    });
  });
});
