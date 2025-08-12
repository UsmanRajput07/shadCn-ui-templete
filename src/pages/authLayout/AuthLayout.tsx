import useAuthTokenStore from "@/zustand/store";
import { Navigate, Outlet } from "react-router";
import { Toaster } from "sonner";

export default function AuthLayout() {;
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-lg">
        <Toaster position="top-center" />
        {<Outlet />}
      </div>
    </div>
  );
}
