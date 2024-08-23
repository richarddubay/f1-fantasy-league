import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export type DriverType = {
  id: number;
  first_name: string;
  last_name: string;
  team_id: number;
  driver_number: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  place_of_birth: string;
  country: string;
  birth_date: Date;
};

export const getDrivers = async () => {
  const response = await axios.get("/driver");
  return response.data as DriverType[];
};

const useGetDrivers = () => {
  return useQuery({
    queryKey: ["getDrivers"],
    queryFn: getDrivers,
  });
};

export default useGetDrivers;
