import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Dashboard";
import { AuthProvider } from "./Context/AuthContext";
import HomePage from "./Components/Homepage";
import PrivateRoute from "./Components/Utils/PrivateRoute";
import Login from "./Components/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          {/* Use PrivateRoute to protect the /dashboard route */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/homepage"
            element={<PrivateRoute element={<HomePage />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
