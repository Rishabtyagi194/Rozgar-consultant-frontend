import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/global/Navbar";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import RegisterAgencyForm from "./Pages/RegistrationForm";

import { Home } from "./Pages/Home";
import { Setting } from "./Pages/Setting";
import { AllJobs } from "./Pages/AllJobs";
import ContactPage from "./Pages/ContactUs";
import JobPostForm from "./components/JobPosting/JobPostingForm";
import InternshipJob from "./components/JobPosting/Internship/InternshipPostingForm";
import { HRResponses } from "./Pages/HRResponses";
import UploadResume from "./Pages/UploadResume";
import MyArchive from "./Pages/MyArchive";
import UploadExcel from "./Pages/UploadExcel";
import JobDetails from "./components/Jobs/JobDetailsById";
import UploadResumeJob from "./components/UploadResume/UploadResumeJob";
import { Toaster } from "react-hot-toast";

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
