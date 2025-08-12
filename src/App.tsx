import { BrowserRouter, Routes, Route } from "react-router";
import Telegram from "@/pages/products/telegram/Telegram";
import TelegramDetails from "@/pages/products/telegram/TelegramDetails";
import AuthLayout from "./pages/authLayout/AuthLayout";
import Layout from "./pages/DashboardLayout/Layout";
import Login from "./pages/authLayout/Login";
import OTP from "./pages/authLayout/OTP";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />}></Route>
            <Route path="otp/:mobile" element={<OTP />}></Route>
          </Route>
          <Route path="/dashboard" element={<Layout />}>
            <Route path="telegram" element={<Telegram />} />
            <Route path="telegramDetails" element={<TelegramDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
