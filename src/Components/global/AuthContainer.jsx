import { useState } from "react";
import Login from "../../Pages/Login";
import Signup from "../../Pages/Signup";
import ForgotPassword from "../../Pages/ForgotPassword";


const AuthContainer = () => {
  const [authView, setAuthView] = useState("");

  return (
    <>
      {authView === "" && <Login setAuthView={setAuthView} />}
      {authView === "signup" && <Signup setAuthView={setAuthView} />}
      {authView === "forgot" && <ForgotPassword setAuthView={setAuthView} />}
    </>
  );
};

export default AuthContainer;
