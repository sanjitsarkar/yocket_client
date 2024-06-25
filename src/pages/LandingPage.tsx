import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const startGame = () => {
    setLoading(true);
    setShowModal(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/cop-selection");
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#081428] via-[#0a041d] to-[#06284d] text-white relative">
      <h1 className="text-4xl font-bold mb-4 text-center animate-fadeIn">
        Fugitive Capture Game
      </h1>
      <button
        onClick={startGame}
        className="px-4 py-2 bg-[#0968db] text-white rounded-md transition-transform transform hover:scale-105 hover:bg-blue-700"
      >
        Start Game
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <MagnifyingGlass color="#ffffff" height={100} width={100} />
            </div>
          ) : (
            <div
              className="text-white rounded-lg p-8 max-w-lg mx-auto animate-slideUp sm:w-8/12 h-5/6 relative flex flex-col backdrop-filter backdrop-blur-lg bg-opacity-70 bg-[#09305f] overflow-auto w-11/12"
              ref={modalRef}
            >
              <h2 className="text-2xl font-bold mb-4">Game Instructions</h2>
              <p className="mb-2">
                A notorious criminal escape artist has vanished again. However,
                the criminal may be hiding in only one of the possible 5
                neighbouring cities. 3 fearless cops have volunteered in
                capturing the fugitive hiding and they need your help!
              </p>
              <h3 className="font-bold mt-4">Gameplay:</h3>
              <ul className="list-disc list-inside mb-2">
                <li>
                  👮‍♂️ Each cop independently chooses one city from below to
                  investigate.
                </li>
                <li>
                  🚓 Each cop selects an electric vehicle based on the chosen
                  city's distance.
                </li>
                <li>
                  🔍 The system determines if any cop successfully found the
                  fugitive (simulated).
                </li>
              </ul>
              <h3 className="font-bold mt-4">Rules:</h3>
              <ul className="list-disc list-inside mb-2">
                <li>🌆 City selections must be unique for each cop.</li>
                <li>🔋 Vehicle must have enough range for a round trip.</li>
              </ul>
              <h3 className="font-bold mt-4">Cities:</h3>
              <ul className="list-disc list-inside mb-2">
                <li>Yapkashnagar (60 KM) 🌇</li>
                <li>Lihaspur (50 KM) 🌫️</li>
                <li>Narmis City (40 KM) 🏙️</li>
                <li>Shekharvati (30 KM) 🌄</li>
                <li>Nuravgram (20 KM) 🤖</li>
              </ul>
              <h3 className="font-bold mt-4">Vehicles:</h3>
              <ul className="list-disc list-inside">
                <li>EV Bike (60 KM range, 2 available) 🏍️</li>
                <li>EV Car (100 KM range, 1 available) 🚗</li>
                <li>EV SUV (120 KM range, 1 available) 🚙</li>
              </ul>
              <button
                onClick={closeModal}
                className="sticky bottom-0 mt-4 px-4 py-2 bg-blue-500 text-white rounded-md transition-transform transform hover:scale-105 hover:bg-blue-700"
              >
                Got it, Let's Play!
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
