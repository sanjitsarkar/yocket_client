import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResultPage from "./pages/ResultPage";
import { Provider } from "react-redux";
import store from "./store";
import CopSelectionPage from "./pages/CopSelectionPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cop-selection" element={<CopSelectionPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
