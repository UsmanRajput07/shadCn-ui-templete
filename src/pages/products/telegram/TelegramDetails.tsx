import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TelegramOption } from "./TelegramOption";

import { EllipsisVertical, Send, Share2 } from "lucide-react";
import OverView from "./options/overview/OverView";
import { useState } from "react";
import SubscriptionPlans from "./options/subscriptionPlans/SubscriptionPlans";
import Couponse from "./options/couponse/Couponse";
import { useLocation } from "react-router";

export default function TelegramDetails() {
  const [selected, setSelected] = useState("overView");
  const { state } = useLocation();
  const handleOptionClick = (option: string) => {
    setSelected(option);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="border  w-full  border-gray-200 rounded-lg p-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex gap-8">
                <img
                  src={state?.image}
                  alt="telegram"
                  className="w-30 h-30 object-contain rounded-lg"
                />
                <div>
                  <p className="text-base font-semibold  bg-gray-100 p-2 rounded-lg flex gap-4 flex-wrap md:w-1/3">
                    Telegram channel
                    <Send />
                  </p>
                  <p className="text-lg">{state?.title}</p>
                  <p className="text-base">{state?.description}</p>
                </div>
              </div>
            </CardTitle>
            <CardAction className="flex gap-4">
              <Share2 />
              <EllipsisVertical />
            </CardAction>
          </CardHeader>
          <CardFooter className="border-b border-gray-200 p-4">
            <TelegramOption value={selected} onSelect={handleOptionClick} />
          </CardFooter>

          {selected === "overView" && <OverView data={state} />}
          {selected === "subscription-Plans" && (
            <SubscriptionPlans data={state} />
          )}
          {selected === "coupons" && <Couponse data={state} />}
        </Card>
      </div>
      {/* <div className="border h-[90vh] w-full  border-gray-200 rounded-lg p-4 flex flex-col gap-4"></div>
      <div className="border h-[90vh] w-full  border-gray-200 rounded-lg p-4 flex flex-col gap-4"></div> */}
    </div>
  );
}
