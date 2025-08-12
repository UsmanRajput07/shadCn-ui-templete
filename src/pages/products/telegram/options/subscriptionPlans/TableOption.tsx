import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function TableOption({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(value) => {
        if (value) {
          onSelect(value);
        }
      }}
    >
      <ToggleGroupItem value="active" aria-label="Toggle active">
        <p className="text-base">Active plans</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="inactive" aria-label="Toggle inactive">
        <p className="text-base">Inactive plans</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
