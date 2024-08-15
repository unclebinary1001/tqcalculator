import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Fp from "./components/factors/Fp";
import Pf from "./components/factors/Pf";
import Af from "./components/factors/Af";
import Fa from "./components/factors/Fa";
import Ap from "./components/factors/Ap";
import Pa from "./components/factors/Pa";
import Ag from "./components/factors/Ag";
import Pg from "./components/factors/Pg";
import Fg from "./components/factors/Fg";
import { NotFound } from "./components/NotFound";
import "./App.css";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/index.html" element={<Home />} />
              <Route path="/home" element={<Home />} />

              <Route path="/factors/fa" element={<Fa />} />
              <Route path="/factors/fp" element={<Fp />} />
              <Route path="/factors/fg" element={<Fg />} />

              <Route path="/factors/pa" element={<Pa />} />
              <Route path="/factors/pf" element={<Pf />} />
              <Route path="/factors/pg" element={<Pg />} />

              <Route path="/factors/af" element={<Af />} />
              <Route path="/factors/ag" element={<Ag />} />
              <Route path="/factors/ap" element={<Ap />} />

              <Route path="*" element={<NotFound/>} />
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}
