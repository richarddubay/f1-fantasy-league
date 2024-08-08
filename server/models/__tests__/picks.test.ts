import { picksModel } from "..";
import { prismaForTests } from "../../test-utils/prisma";
import { prisma } from "../../utils/prisma";

jest.mock("@prisma/client");

describe("Picks Model", () => {
  describe("deletePick", () => {
    it("should delete a pick", async () => {
      // Arrange
      const pick = {
        id: 1,
        player_id: 1,
        grand_prix_id: 1,
        choice_id: 1,
        pick_id: 1,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      };
      prismaForTests.picks = {
        delete: jest.fn().mockResolvedValue(pick),
      };

      // Act
      const result = await picksModel.deletePick(1);

      // Assert
      expect(prisma.picks.delete).toHaveBeenCalledTimes(1);
      expect(prisma.picks.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
        })
      );
      expect(result).toEqual(pick);
    });
  });

  describe("getAllPicks", () => {
    it("should get all picks", async () => {
      // Arrange
      const picks = [
        {
          id: 1,
          player_id: 1,
          grand_prix_id: 1,
          choice_id: 1,
          pick_id: 1,
          created_at: new Date(),
          updated_at: null,
          deleted_at: null,
        },
        {
          id: 2,
          player_id: 2,
          grand_prix_id: 2,
          choice_id: 2,
          pick_id: 2,
          created_at: new Date(),
          updated_at: null,
          deleted_at: null,
        },
      ];
      prismaForTests.picks = {
        findMany: jest.fn().mockResolvedValue(picks),
      };

      // Act
      const result = await picksModel.getAllPicks();

      // Assert
      expect(prisma.picks.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.picks.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: {
            id: "asc",
          },
        })
      );
      expect(result).toEqual(picks);
    });
  });

  describe("getPicksByGrandPrixId", () => {
    it("should get all the picks associated with a particular grand prix", async () => {
      // Arrange
      const picks = [
        {
          id: 1,
          player_id: 1,
          grand_prix_id: 1,
          choice_id: 1,
          pick_id: 1,
          created_at: new Date(),
          updated_at: null,
          deleted_at: null,
        },
        {
          id: 2,
          player_id: 2,
          grand_prix_id: 2,
          choice_id: 2,
          pick_id: 2,
          created_at: new Date(),
          updated_at: null,
          deleted_at: null,
        },
      ];
      prismaForTests.picks = {
        findMany: jest.fn().mockResolvedValue(picks[0]),
      };

      // Act
      const result = await picksModel.getPicksByGrandPrixId(1);

      // Assert
      expect(prisma.picks.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.picks.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            grand_prix_id: 1,
          },
        })
      );
      expect(result).toEqual(picks[0]);
    });
  });

  describe("postPick", () => {
    it("should create a pick", async () => {
      // Arrange
      const pick = {
        id: 1,
        player_id: 1,
        grand_prix_id: 1,
        choice_id: 1,
        pick_id: 1,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      };
      prismaForTests.picks = {
        create: jest.fn().mockResolvedValue(pick),
      };

      // Act
      const result = await picksModel.postPick(pick);

      // Assert
      expect(prisma.picks.create).toHaveBeenCalledTimes(1);
      expect(prisma.picks.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            ...pick,
            created_at: new Date(),
          },
        })
      );
      expect(result).toEqual(pick);
    });
  });

  describe("putPick", () => {
    it("should update a pick", async () => {
      // Arrange
      const pick = {
        player_id: 1,
        grand_prix_id: 1,
        choice_id: 1,
        pick_id: 1,
      };
      prismaForTests.picks = {
        update: jest.fn().mockResolvedValue(pick),
      };

      // Act
      const result = await picksModel.putPick(1, pick);

      // Assert
      expect(prisma.picks.update).toHaveBeenCalledTimes(1);
      expect(prisma.picks.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
          data: {
            ...pick,
            updated_at: new Date(),
          },
        })
      );
      expect(result).toEqual(pick);
    });
  });
});
