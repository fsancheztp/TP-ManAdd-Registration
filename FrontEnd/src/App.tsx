import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context";
import { HomeMainMenu } from "./Pages/HomeMainMenu";
import ManAddList from "./Pages/ManAddList";
import ManAddPage from "./Pages/ManAddPage";
import Footer from "./components/Footer";


function App() {
  return (

      <UserContextProvider>
        <div 
          className="page__content"
          style={{ background: "var(--color-page-bg)" }}
        >
          <Routes>
            <Route path="/" element={<HomeMainMenu />} />
            <Route path="/ManAddList" element={<ManAddList />} />
            <Route path="/manadd-page" element={<ManAddPage />} />
            {/* <Route path="/Register" element={<RegisterPage />} /> */}
          </Routes>
        </div>
        <Footer />
      </UserContextProvider>

  );
}

export default App;
