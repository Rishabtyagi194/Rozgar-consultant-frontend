import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "./Pages/Sidebar";
import { Home } from "./Pages/Home";
import { Setting } from "./Pages/Setting";
import LoginPage from "./Pages/Login";
import { AllJobs } from "./Pages/AllJobs";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pages with Sidebar */}
        <Route
          path="/"
          element={<SidebarLayout />}
        >
          <Route path="home" element={<Home />} />
          <Route path="home" element={<AllJobs />} />
          <Route path="settings" element={<Setting />} />
        </Route>

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
