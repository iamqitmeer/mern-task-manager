import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Task from "./screens/Task";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/task" element={<Task />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
