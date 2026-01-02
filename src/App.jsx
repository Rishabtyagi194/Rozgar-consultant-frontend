import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/global/Navbar";
import AuthContainer from "./Components/global/AuthContainer";

import { Home } from "./Pages/Home";
import { Setting } from "./Pages/Setting";
import { AllJobs } from "./Pages/AllJobs";
import ContactPage from "./Pages/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<AuthContainer />} />

        {/* App Layout with Navbar */}
        <Route element={<Navbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/contactus" element={<ContactPage />} />
          <Route path="/recommendedjobs" element={<AllJobs />} />
          <Route path="/service" element={<ContactPage />} />
          <Route path="/profile" element={<ContactPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
