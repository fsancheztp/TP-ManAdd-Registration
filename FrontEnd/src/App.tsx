import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { UserContextProvider } from "./context";
import Home from "./Pages/Home";
import ManAddPage from "./Pages/ManAddPage";
import Footer from "./components/Footer";
import Reports from "./Pages/Reports";
import Help from "./Pages/Help";
import ReportsManAdds from "./Pages/ReportsManAdds";
import ReportsLots from "./Pages/ReportsLots";
import ReportsMaterials from "./Pages/ReportsMaterials";

function App() {
  return (
    <>
      <UserContextProvider>
        <Header />
        <div className="m-0 p-0 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manadd-page" element={<ManAddPage />} />
            <Route path="/help-page" element={<Help />} />
            <Route path="/reports-page" element={<Reports />} />
            <Route path="/reports/manadd" element={<ReportsManAdds />} />
            <Route path="/reports/lots" element={<ReportsLots />} />
            <Route path="/reports/materials" element={<ReportsMaterials />} />
          </Routes>
        </div>
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default App;
