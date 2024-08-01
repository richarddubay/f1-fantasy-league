import { prisma } from "../utils/prisma";

type Driver = {
  first_name: string;
  last_name: string;
  team_id: number;
  driver_number: number;
  place_of_birth: string;
  country: string;
  created_at: Date;
};

export const deleteDriver = async (driverId: number) => {
  const deletedDriver = await prisma.driver.delete({
    where: {
      id: driverId,
    },
  });
  return deletedDriver;
};

export const getAllDrivers = async () => {
  const drivers = await prisma.driver.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return drivers;
};

export const getDriverById = async (driverId: number) => {
  const driver = await prisma.driver.findUnique({
    where: {
      id: driverId,
    },
  });
  return driver;
};

export const postDriver = async (driver: Driver) => {
  try {
    const newDriver = await prisma.driver.create({
      data: {
        first_name: driver.first_name,
        last_name: driver.last_name,
        team_id: driver.team_id,
        driver_number: driver.driver_number,
        place_of_birth: driver.place_of_birth,
        country: driver.country,
        created_at: driver.created_at,
      },
    });
    return {
      message: "Success",
      statusCode: 201,
      driver: newDriver,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};

export const putDriver = async (driverId: number, driver: Driver) => {
  try {
    const updatedDriver = await prisma.driver.update({
      where: {
        id: driverId,
      },
      data: {
        ...driver,
      },
    });

    return {
      message: "Success",
      statusCode: 200,
      driver: updatedDriver,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
      errorMessage: error,
    };
  }
};
