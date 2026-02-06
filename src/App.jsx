import { BrowserRouter, Routes, Route } from "react-router-dom";



import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterAgencyForm from "./pages/RegistrationForm";

import { Home } from "./pages/Home";
import { Setting } from "./pages/Setting";
import { AllJobs } from "./pages/AllJobs";
import ContactPage from "./pages/ContactUs";
import { HRResponses } from "./pages/HRResponses";
import UploadResume from "./pages/UploadResume";
import MyArchive from "./pages/MyArchive";
import UploadExcel from "./pages/UploadExcel";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/global/Navbar";
import JobPostForm from "./components/JobPosting/JobPostingForm";
import InternshipJob from "./components/JobPosting/Internship/InternshipPostingForm";
import JobDetails from "./components/Jobs/JobDetailsById";
import UploadResumeJob from "./components/UploadResume/UploadResumeJob";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <BrowserRouter>
        <Toaster position="top-right" />
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
          <Route path="/jobposting/:id" element={<JobDetails />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/upload-resume/jobs/:id" element={<UploadResumeJob />} />
          <Route path="/my-archive" element={<MyArchive />} />
          <Route path="/upload-data" element={<UploadExcel />} />

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
