import Instrument from "./components/Instrument";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Quotes from "./components/Quotes";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/instruments/:id" element={<Quotes />} />
          <Route path="/instruments" element={<Instrument />} />
          <Route
            path="/"
            element={<Navigate replace to="/instruments" />}
          />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
