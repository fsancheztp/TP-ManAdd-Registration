import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { UserContextProvider } from "./context";
import Home from "./Pages/Home";
import ManAddPage from "./Pages/ManAddPage";
import Footer from "./components/Footer";


function App() {
  return (

      <UserContextProvider>
        <Header title = "Mat Man" />
        <div
          className="lg:px-10 lg:py-10 mt-0 p-0 min-h-screen"
          style={{ background: "var(--color-page-bg)" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manadd-page" element={<ManAddPage />} />
          </Routes>
        </div>
        <Footer />
      </UserContextProvider>

  );
}

export default App;
