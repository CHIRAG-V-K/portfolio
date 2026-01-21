import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Model3DCanvas } from "./components";
import { Leva } from "leva";
function App() {
  return (
    <>
      <Leva hidden />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Model3DCanvas />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
