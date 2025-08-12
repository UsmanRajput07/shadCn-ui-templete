import axiosWrapper from "../axiosWrapper";

const fetchPackages = async () => {
  const res = await axiosWrapper.get("/fetch-packages");
  return res.data;
};

const fetchPlans = async (params: { package_id: string; coupon?: string }) => {
  const res = await axiosWrapper.get("/fetch-plans", { params });
  return res.data;
};

const fetchPackageDeatails = async ({ package_id }: { package_id: string }) => {
  const res = await axiosWrapper.get(`/package-calculation/${package_id}`);
  return res.data;
};

export { fetchPackages, fetchPlans, fetchPackageDeatails };
