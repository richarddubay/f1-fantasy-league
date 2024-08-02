import { Request, Response } from "express";
import { driversModel } from "../models";
import { prisma } from "../utils/prisma";

const deleteDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const driver = await prisma.driver.findUnique({
      where: {
        id: numericId,
      },
    });
    if (driver) {
      const deletedDriver = await driversModel.deleteDriver(numericId);
      res.json({
        message: "Deleted driver",
        pick: {
          id: deletedDriver.id,
          first_name: deletedDriver.first_name,
          last_name: deletedDriver.last_name,
          place_of_birth: deletedDriver.place_of_birth,
          country: deletedDriver.country,
          birth_date: deletedDriver.birth_date,
          created_at: deletedDriver.created_at,
        },
      });
    } else {
      res.send("No driver with that id exists");
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await driversModel.getAllDrivers();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getDriverById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const driver = await driversModel.getDriverById(numericId);
    res.json(driver);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const postDriver = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      team_id,
      driver_number,
      place_of_birth,
      country,
      birth_date,
    } = req.body;
    const newDriver = {
      first_name,
      last_name,
      team_id,
      driver_number,
      place_of_birth,
      country,
      birth_date,
      created_at: new Date(),
    };

    if (
      !newDriver.first_name ||
      !newDriver.last_name ||
      !newDriver.team_id ||
      !newDriver.driver_number ||
      !newDriver.place_of_birth ||
      !newDriver.country ||
      !newDriver.birth_date
    ) {
      return res
        .status(400)
        .send(
          "A driver needs a first name, a last name, a team id, a driver number, a place of birth, a country, and a birth date."
        );
    }

    const driverResponse = await driversModel.postDriver(newDriver);

    return res.status(201).json({
      message: "Driver created successfully",
      driver: driverResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error adding the new driver: ${error}`,
      error: error,
    });
  }
};

const putDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const {
      first_name,
      last_name,
      team_id,
      driver_number,
      place_of_birth,
      country,
      birth_date,
      created_at,
    } = req.body;

    const driverToUpdate = {
      first_name,
      last_name,
      team_id,
      driver_number,
      place_of_birth,
      country,
      birth_date,
      created_at,
    };

    const driverResponse = await driversModel.putDriver(
      numericId,
      driverToUpdate
    );

    return res.status(200).json({
      message: "Driver updated successfully",
      driver: driverResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: `There was an error updating the driver: ${error}`,
      error: error,
    });
  }
};

export { deleteDriver, getDrivers, getDriverById, postDriver, putDriver };
