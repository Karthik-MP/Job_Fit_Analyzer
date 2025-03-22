import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Login from "./Components/login";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
