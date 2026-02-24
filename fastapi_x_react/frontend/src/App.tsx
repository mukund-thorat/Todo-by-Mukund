import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/Welcome.tsx";
import SignUpPage from "./pages/SignUp.tsx";
import LoginPage from "./pages/Login.tsx";
import Avatar from "./pages/Avatar.tsx";
import OTPPage from "./pages/OTP.tsx";

function App() {

  return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pick_avatar" element={<Avatar />} />
        <Route path="/verify_otp" element={<OTPPage />} />
      </Routes>
  )
}

export default App
