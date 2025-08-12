import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function TelegramOption({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      className="w-5/6"
      value={value}
      onValueChange={(value) => {
        if (value) {
          onSelect(value);
        }
      }}
    >
      <ToggleGroupItem value="overView" aria-label="Toggle overview">
        <p className="text-base">OverView</p>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="subscription-Plans"
        aria-label="Toggle subscription plans"
      >
        <p className="text-base">Subscription Plans</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="coupons" aria-label="Toggle coupons">
        <p className="text-base">Coupons</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="Affiliate" aria-label="Toggle affiliate">
        <p className="text-base">Affiliate</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
