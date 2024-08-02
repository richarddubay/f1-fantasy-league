import { prisma } from "../utils/prisma";
import type { driver as Driver } from "@prisma/client";

type DriverType = Omit<
  Driver,
  "created_at" | "deleted_at" | "id" | "updated_at"
>;

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
      ...driver,
      created_at: new Date(),
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
      updated_at: new Date(),
    },
  });
  return updatedDriver;
};
