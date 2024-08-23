import useGetDrivers from "@/hooks/api/drivers/useGetDrivers";

const Drivers = () => {
  const query = useGetDrivers();
  return (
    <div>
      <h1 className="text-3xl font-bold">Drivers</h1>
      <ul>
        {query.data?.map((driver) => (
          <li key={driver.id}>
            {driver.first_name} {driver.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drivers;
