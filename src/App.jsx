import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Login from "./Components/login";
import Signup from "./Components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
