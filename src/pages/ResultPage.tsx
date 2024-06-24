import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetResult } from "../store/slices/resultSlice";
import { resetCops } from "../store/slices/copsSlice";
import { RootState } from "../store";
import { useEffect } from "react";

const ResultPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { result, error, loading } = useSelector(
    (state: RootState) => state.result
  );
  const handleRestart = () => {
    dispatch(resetCops());
    dispatch(resetResult());
    navigate("/");
  };
  useEffect(() => {
    if (!result && !loading) {
      navigate("/");
    }
  }, [navigate, result, loading]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Result</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">
          Error loading data. Please try again later.
        </div>
      ) : (
        <>
          <p className="mb-4">
            <p className="text-center">
              {result && result?.capturingCop
                ? `${result?.capturingCop?.name} captured the fugitive in ${result?.fugitiveCity?.name} from ${result?.capturingCop?.selectedCity} by ${result?.capturingCop?.selectedVehicle}!`
                : `Fugitive Escaped and is at ${result?.fugitiveCity?.name}`}
            </p>
          </p>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

export default ResultPage;
