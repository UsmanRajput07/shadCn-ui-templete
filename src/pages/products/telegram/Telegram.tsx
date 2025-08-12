import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchPackages } from "@/services/packages/packages";
import type { Packages } from "@/types/packages/packages";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function Telegram() {
  const { data } = useQuery({
    queryKey: ["all-packages"],
    queryFn: fetchPackages,
  });
  const navigate = useNavigate();
  return (
    <div className="border h-[90vh] w-full  border-gray-200 rounded-lg p-4 flex flex-col gap-4">
      <Button className="w-1/5 self-end" variant={"outline"}>
        Add Group
      </Button>
      <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-4  overflow-y-scroll h-[80vh]">
        {data?.map((item: Packages) => {
          return (
            <Card
              key={item.id}
              onClick={() => {
                navigate("/dashboard/telegramDetails", { state: item });
              }}
            >
              <CardHeader>
                <CardTitle className="flex flex-col gap-4 ">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt="telegram"
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  {item?.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {item?.description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
