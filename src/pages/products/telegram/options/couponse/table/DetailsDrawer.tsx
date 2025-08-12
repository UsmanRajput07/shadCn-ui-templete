import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// import PlansTable from "../../subscriptionPlans/PlansTable";

export function DetailsDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">View Details</Button>
      </DrawerTrigger>
      <DrawerContent className="w-full">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Coupen Details</DrawerTitle>
          </DrawerHeader>
          <PlansTable
              headers={[
                "Plan title",
                "Plan duration",
                "Date of creation",
                "plan price",
                "Subscriptions sold and & earnings",
              ]}
              
            />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
