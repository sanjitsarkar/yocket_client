import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { fetchCities } from "../store/slices/citiesSlice";
import { setCopCity, setCopVehicle } from "../store/slices/copsSlice";
import { fetchResult } from "../store/slices/resultSlice";
import { fetchVehicles } from "../store/slices/vehiclesSlice";
import { MagnifyingGlass } from "react-loader-spinner";

const CopSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cops = useSelector((state: RootState) => state.cops.cops);
  const {
    cities,
    error: citiesError,
    loading: citiesLoading,
  } = useSelector((state: RootState) => state.cities);
  const {
    vehicles,
    error: vehiclesError,
    loading: vehiclesLoading,
  } = useSelector((state: RootState) => state.vehicles);
  const [vehicleCounts, setVehicleCounts] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleCityChange = (index: number, cityId: string) => {
    if (validateUniqueCity(cityId, index)) {
      dispatch(setCopCity({ index, cityId }));
    }
  };

  const handleVehicleChange = (index: number, vehicleId: string) => {
    const prevSelectedVehicleId = cops[index].selectedVehicleId;
    if (validateVehicleSelection(vehicleId, prevSelectedVehicleId)) {
      dispatch(setCopVehicle({ index, vehicleId }));
      updateVehicleCounts(vehicleId, prevSelectedVehicleId);
    }
  };

  const validateUniqueCity = (cityId: string, index: number) => {
    const isUnique = !cops.some(
      (cop, i) => i !== index && cop.selectedCityId === cityId
    );
    if (!isUnique) {
      toast.error("Each cop must select a unique city.");
    }
    return isUnique;
  };

  const validateVehicleSelection = (
    newVehicleId: string,
    prevVehicleId: string
  ) => {
    if (newVehicleId === prevVehicleId) {
      return true;
    }
    const newCount = (vehicleCounts[newVehicleId] || 0) + 1;
    const vehicle = vehicles.find((v) => String(v._id) === newVehicleId);
    if (newCount > vehicle.count) {
      toast.error("Cop vehicle count exceeded!");
      return false;
    }
    return true;
  };

  const updateVehicleCounts = (newVehicleId: string, prevVehicleId: string) => {
    setVehicleCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      if (newVehicleId) {
        updatedCounts[newVehicleId] = (updatedCounts[newVehicleId] || 0) + 1;
      }
      if (prevVehicleId) {
        updatedCounts[prevVehicleId] = (updatedCounts[prevVehicleId] || 1) - 1;
      }
      return updatedCounts;
    });
  };

  const validateSelections = () => {
    const uniqueCities = new Set(cops.map((cop) => cop.selectedCityId));
    if (uniqueCities.has("")) {
      toast.error("Each cop must select a city.");
      return false;
    }
    if (uniqueCities.size !== cops.length) {
      toast.error("Each cop must select a unique city.");
      return false;
    }

    const selectedVehicleIds = cops
      .filter((cop) => !!cop.selectedVehicleId)
      .map((cop) => cop.selectedVehicleId);

    if (selectedVehicleIds.length !== cops.length) {
      toast.error("Each cop must select a vehicle.");
      return false;
    }

    for (const vehicleId of selectedVehicleIds) {
      const vehicle = vehicles.find((v) => String(v._id) === vehicleId);
      if (vehicleCounts[vehicleId] > vehicle.count) {
        toast.error("Cop vehicle count exceeded!");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateSelections()) {
      dispatch(fetchResult({ cops }));
      navigate("/result");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#1a2a3a] via-[#2a4b5a] to-[#3a6a8a] text-white !text-sm !sm:text-xl">
      <h1 className="sm:text-4xl text-2xl font-bold sm:mb-2 mt-10 sm:mt-2 text-center animate-fadeIn">
        Cop Selection 🚔
      </h1>
      {citiesLoading || vehiclesLoading ? (
        <div className="flex items-center justify-center h-full">
          <MagnifyingGlass color="#ffffff" height={100} width={100} />
        </div>
      ) : citiesError || vehiclesError ? (
        <div className="text-center text-red-500 mt-16">
          Error loading data. Please try again later.
        </div>
      ) : (
        <div className="w-full max-w-4xl sm:p-6 p-3  relative">
          <h2 className="sm:text-2xl text-xl font-bold mb-10 sm:mb-4 text-center">
            Select City and Vehicle for Each Cop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {cops.map((cop, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md bg-[#1f3b58] backdrop-filter backdrop-blur-lg bg-opacity-80 transform transition-transform duration-500 hover:scale-105"
              >
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <img
                    src={`https://robohash.org/${cop.name}?set=set4`} // Example image API for cops
                    alt={cop.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {cop.name} 👮‍♂️
                </h3>
                <label className="block mt-2">City 🌆:</label>
                <select
                  value={cop.selectedCityId}
                  onChange={(e) => handleCityChange(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-black cursor-pointer bg-white"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name} - {city.distance} KM
                    </option>
                  ))}
                </select>
                <label className="block mt-2">Vehicle 🚗:</label>
                <select
                  value={cop.selectedVehicleId}
                  onChange={(e) => handleVehicleChange(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-black cursor-pointer bg-white"
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.kind} - {vehicle.range} KM Range -{" "}
                      {vehicle.count - (vehicleCounts[vehicle._id] || 0)}{" "}
                      Available
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full transition-transform transform hover:scale-105 hover:bg-blue-700 sticky bottom-0"
          >
            Submit 🚀
          </button>
        </div>
      )}
    </div>
  );
};

export default CopSelectionPage;
