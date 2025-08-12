export type CreateCoupon = {
  package_id: string;
  code: string;
  visibility: string;
  discount_type: string;
  discount_rate: string;
  start_date: string;
  end_date: string;
  limit_per_coupon: string;
  limit_per_user: string;
};

export type Coupon = CreateCoupon & {
  id: string;
  is_expired: boolean;
}
