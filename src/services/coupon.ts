import type { CreateCoupon } from "@/types/coupon";
import axiosWrapper from "./axiosWrapper";

const createCoupon = async (data: CreateCoupon) => {
  const res = await axiosWrapper.post("/create-coupon", data);
  return res.data;
};
const fetchCoupons = async (params: { package_id: string }) => {
  const res = await axiosWrapper.get("/fetch-coupons", { params });
  return res.data;
};
const updateCoupon = async ({
  id,
  data,
}: {
  id: string;
  data: { is_expired: boolean };
}) => {
  const res = await axiosWrapper.put(`/update-coupon/${id}`, data);
  return res.data;
};

export { createCoupon, fetchCoupons, updateCoupon };
