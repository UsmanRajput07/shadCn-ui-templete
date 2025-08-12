import axiosWrapper from "./axiosWrapper";

const login = async (data: { mobile: string }) => {
  const res = await axiosWrapper.post("/request-otp", data);
  return res.data;
};

const verifyOtp = async (data: { mobile: string; otp: string }) => {
  const res = await axiosWrapper.post("/verify-otp", data);
  return res.data;
};

export { login, verifyOtp };
