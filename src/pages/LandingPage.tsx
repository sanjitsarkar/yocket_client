import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/cop-selection");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Fugitive Capture Game
      </h1>
      <button
        onClick={startGame}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Start Game
      </button>
    </div>
  );
};

export default LandingPage;
