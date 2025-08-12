import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  form: UseFormReturn<T>;
};

export default function DatePicker<T extends FieldValues>({
  label,
  name,
  form,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const date = field.value ? new Date(field.value) : null;
        return (
          <FormItem className="flex flex-col">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <DatePickerLib
                selected={date}
                onChange={(val) => field.onChange(val)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15} // 15-min steps
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Pick date & time"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
