import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/global/Navbar";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import RegisterAgencyForm from "./Pages/RegistrationForm";

import { Home } from "./Pages/Home";
import { Setting } from "./Pages/Setting";
import { AllJobs } from "./Pages/AllJobs";
import ContactPage from "./Pages/ContactUs";
import JobPostForm from "./Components/JobPosting/JobPostingForm";
import InternshipJob from "./Components/JobPosting/Internship/InternshipPostingForm";
import { HRResponses } from "./Pages/HRResponses";
import UploadResume from "./Pages/UploadResume";
import MyArchive from "./Pages/MyArchive";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register-agency" element={<RegisterAgencyForm />} />

        {/* App Layout with Navbar */}
        <Route element={<Navbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/job-posting" element={<JobPostForm />} />
          <Route path="/internship-posting" element={<InternshipJob />} />
          <Route path="/hr-responses" element={<HRResponses />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/my-archive" element={<MyArchive />} />


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
