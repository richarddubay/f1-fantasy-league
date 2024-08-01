import { Request, Response } from "express";
import { driversModel } from "../models";
import { prisma } from "../utils/prisma";

const deleteDriver = async (req: Request, res: Response) => {
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
        created_at: deletedDriver.created_at,
      },
    });
  } else {
    res.send("No driver with that id exists");
  }
};

const getDrivers = async (req: Request, res: Response) => {
  const drivers = await driversModel.getAllDrivers();
  res.json(drivers);
};

const getDriverById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const driver = await driversModel.getDriverById(numericId);
  res.json(driver);
};

const postDriver = async (req: Request, res: Response) => {
  const { first_name, last_name, team_id, driver_number, place_of_birth } =
    req.body;
  const newDriver = {
    first_name,
    last_name,
    team_id,
    driver_number,
    place_of_birth,
    created_at: new Date(),
  };

  if (
    !newDriver.first_name ||
    !newDriver.last_name ||
    !newDriver.team_id ||
    !newDriver.driver_number ||
    !newDriver.place_of_birth
  ) {
    return res
      .status(400)
      .send(
        "A driver needs a first name, a last name, a team id, a driver number, and a place of birth."
      );
  }

  const driverResponse = await driversModel.postDriver(newDriver);

  if ("errorMessage" in driverResponse) {
    console.error(
      `There was an error adding the new driver: ${driverResponse.errorMessage}`
    );
    return res
      .status(driverResponse.statusCode)
      .send(
        `There was an error adding the new driver: ${driverResponse.errorMessage}`
      );
  } else {
    return res.status(driverResponse.statusCode).json({
      message: "Driver created successfully",
      driver: driverResponse.driver,
    });
  }
};

const putDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const {
    first_name,
    last_name,
    team_id,
    driver_number,
    place_of_birth,
    created_at,
  } = req.body;

  const driverToUpdate = {
    first_name,
    last_name,
    team_id,
    driver_number,
    place_of_birth,
    created_at,
  };

  const driverResponse = await driversModel.putDriver(
    numericId,
    driverToUpdate
  );

  if ("errorMessage" in driverResponse) {
    console.error(
      `There was an error updating the driver: ${driverResponse.errorMessage}`
    );
    return res
      .status(driverResponse.statusCode)
      .send(
        `There was an error updating the driver: ${driverResponse.errorMessage}`
      );
  } else {
    return res.status(driverResponse.statusCode).json({
      message: "Driver updated successfully",
      driver: driverResponse.driver,
    });
  }
};

export { deleteDriver, getDrivers, getDriverById, postDriver, putDriver };
