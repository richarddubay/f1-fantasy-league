import { prisma } from "../utils/prisma";
import type { driver as Driver } from "@prisma/client";

type DriverType = Omit<Driver, "id" | "updated_at" | "deleted_at">;

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

export const postDriver = async (driver: DriverType) => {
  const newDriver = await prisma.driver.create({
    data: {
      first_name: driver.first_name,
      last_name: driver.last_name,
      team_id: driver.team_id,
      driver_number: driver.driver_number,
      place_of_birth: driver.place_of_birth,
      country: driver.country,
      birth_date: driver.birth_date,
      created_at: driver.created_at,
    },
  });
  return newDriver;
};

export const putDriver = async (driverId: number, driver: DriverType) => {
  const updatedDriver = await prisma.driver.update({
    where: {
      id: driverId,
    },
    data: {
      ...driver,
      created_at: driver.created_at ? new Date(driver.created_at) : undefined,
    },
  });
  return updatedDriver;
};
