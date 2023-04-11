import logo from "./logo.svg";
import "./App.css";
import ProductRegister from "./components/productregister";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<ProductRegister />} />
      </Routes>
    </>
  );
}

export default App;
