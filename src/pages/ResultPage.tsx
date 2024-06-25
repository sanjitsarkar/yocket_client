import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetResult } from "../store/slices/resultSlice";
import { resetCops } from "../store/slices/copsSlice";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import Confetti from "react-confetti";

const ResultPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { result, error, loading } = useSelector(
    (state: RootState) => state.result
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRestart = () => {
    dispatch(resetCops());
    dispatch(resetResult());
    navigate("/");
  };

  useEffect(() => {
    if (result && !loading) {
      setShowConfetti(true);
    }
  }, [result, loading]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#1a2a3a] via-[#2a4b5a] to-[#3a6a8a] text-white relative overflow-x-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <h2 className="text-4xl font-bold mb-8 animate-bounce">Result 🏆</h2>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <MagnifyingGlass color="#ffffff" height={100} width={100} />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          Oops! Something went wrong. Please try again later.
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-8 p-6 bg-white bg-opacity-20 rounded-lg shadow-lg sm:w-2/3 w-11/12">
            <p className="sm:text-left text-center text-xl">
              {result && result?.capturingCop ? (
                <>
                  <span role="img" aria-label="police car" className="mr-2">
                    🚔
                  </span>
                  <span className="font-bold text-blue-300">
                    {result?.capturingCop?.name}
                  </span>{" "}
                  heroically captured the fugitive in{" "}
                  <span className="font-bold text-green-300">
                    {result?.fugitiveCity?.name}
                  </span>{" "}
                  from{" "}
                  <span className="font-bold text-yellow-300">
                    {result?.capturingCop?.selectedCity}
                  </span>{" "}
                  using their trusty{" "}
                  <span className="font-bold text-red-300">
                    {result?.capturingCop?.selectedVehicle}
                  </span>{" "}
                  🚀!
                  <span role="img" aria-label="fireworks" className="ml-2">
                    🎉
                  </span>
                </>
              ) : (
                <>
                  Oh no! The fugitive escaped and is currently evading capture
                  in{" "}
                  <span className="font-bold text-red-300">
                    {result?.fugitiveCity?.name}
                  </span>{" "}
                  🏃!
                  <span role="img" aria-label="running" className="ml-2">
                    🚨
                  </span>
                </>
              )}
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-white rounded-md shadow-lg relative z-10 mt-4"
          >
            Play Again 🎮
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
