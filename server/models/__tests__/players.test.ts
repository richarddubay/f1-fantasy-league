import { playersModel } from "..";
import { prismaForTests } from "../../test-utils/prisma";
import { prisma } from "../../utils/prisma";

jest.mock("@prisma/client");

describe("Players Model", () => {
  describe("deletePlayer", () => {
    it("should delete a player", async () => {
      // Arrange
      const player = {
        id: 1,
        identifier: "email_address@email.com",
        first_name: "Rich",
        last_name: "Doobie",
        password: "abc123",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      };
      prismaForTests.player = {
        delete: jest.fn().mockResolvedValue(player),
      };

      // Act
      const result = await playersModel.deletePlayer(1);

      // Assert
      expect(prisma.player.delete).toHaveBeenCalledTimes(1);
      expect(prisma.player.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
        })
      );
      expect(result).toEqual(player);
    });
  });

  describe("getAllPlayers", () => {
    it("should get all players", async () => {
      // Arrange
      const players = [
        {
          id: 1,
          identifier: "email_address@email.com",
          first_name: "Rich",
          last_name: "Doobie",
          password: "abc123",
          created_at: new Date(),
          updated_at: null,
          deleted_at: null,
        },
        {
          id: 2,
          identifier: "i_am_iron_man@avengers.com",
          first_name: "Tony",
          last_name: "Stark",
          password: "def456",
          created_at: new Date(),
          updated_at: null,
          deleted_at: null,
        },
      ];
      prismaForTests.player = {
        findMany: jest.fn().mockResolvedValue(players),
      };

      // Act
      const result = await playersModel.getAllPlayers();

      // Assert
      expect(prisma.player.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.player.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: {
            id: "asc",
          },
        })
      );
      expect(result).toEqual(players);
    });
  });

  describe("getPlayerById", () => {
    it("should get a player by id", async () => {
      // Arrange
      const player = {
        id: 1,
        identifier: "email_address@email.com",
        first_name: "Rich",
        last_name: "Doobie",
        password: "abc123",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      };
      prismaForTests.player = {
        findUnique: jest.fn().mockResolvedValue(player),
      };

      // Act
      const result = await playersModel.getPlayerById(1);

      // Assert
      expect(prisma.player.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.player.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
        })
      );
      expect(result).toEqual(player);
    });
  });

  describe("postPlayer", () => {
    it("should create a player", async () => {
      // Arrange
      const player = {
        id: 1,
        identifier: "email_address@email.com",
        first_name: "Rich",
        last_name: "Doobie",
        password: "abc123",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      };
      prismaForTests.player = {
        create: jest.fn().mockResolvedValue(player),
      };

      // Act
      const result = await playersModel.postPlayer(player);

      // Assert
      expect(prisma.player.create).toHaveBeenCalledTimes(1);
      expect(prisma.player.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            ...player,
            created_at: new Date(),
          },
        })
      );
      expect(result).toEqual(player);
    });
  });

  describe("putPlayer", () => {
    it("should update a player", async () => {
      // Arrange
      const player = {
        first_name: "Richiardo",
        last_name: "Doobie",
        identifier: "email_address@email.com",
        password: "abc123",
      };
      prismaForTests.player = {
        update: jest.fn().mockResolvedValue(player),
      };

      // Act
      const result = await playersModel.putPlayer(1, player);

      // Assert
      expect(prisma.player.update).toHaveBeenCalledTimes(1);
      expect(prisma.player.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
          data: {
            ...player,
            updated_at: new Date(),
          },
        })
      );
      expect(result).toEqual(player);
    });
  });
});
