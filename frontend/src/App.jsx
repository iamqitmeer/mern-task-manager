import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
