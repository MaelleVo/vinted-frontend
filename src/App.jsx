import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);
library.add(faPlus);

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// Components
import Header from "./components/Header";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Router>
        <Header search={search} setSearch={setSearch} />
        <Routes>
          <Route
            path="/"
            element={<Home search={search} setSearch={setSearch} />}
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<p>Error 404 : Can't find this page. </p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
