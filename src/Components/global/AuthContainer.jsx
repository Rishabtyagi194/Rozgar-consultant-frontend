import { useState } from "react";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import ForgotPassword from "../../pages/ForgotPassword";
import RegisterAgencyForm from "../../pages/RegistrationForm";


const AuthContainer = () => {
  const [authView, setAuthView] = useState("");

  return (
    <>
      {authView === "" && <Login setAuthView={setAuthView} />}
      {authView === "signup" && <Signup setAuthView={setAuthView} />}
      {authView === "forgot" && <ForgotPassword setAuthView={setAuthView} />}
      {authView === "consultantregistrationform" && <RegisterAgencyForm setAuthView={setAuthView} />}
    </>
  );
};

export default AuthContainer;
