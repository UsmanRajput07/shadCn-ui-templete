// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { CalendarIcon } from "lucide-react";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { cn } from "@/lib/utils";
// import type { UseFormReturn, FieldPath } from "react-hook-form";
// import { useState, useEffect } from "react";

// type DateTimePickerFieldProps<TFormValues extends Record<string, any>> = {
//   form: UseFormReturn<TFormValues>;
//   name: FieldPath<TFormValues>; // name must be one of the keys from the form schema
//   label?: string;
// };

// export function DateTimePickerField<TFormValues extends Record<string, any>>({
//   form,
//   name,
//   label = "Date & Time",
// }: DateTimePickerFieldProps<TFormValues>) {
//   const isDate = (value: any): value is Date => value instanceof Date;
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
//     form.getValues(name)
//   );
//   const [selectedTime, setSelectedTime] = useState<string>(
//     selectedDate ? selectedDate.toTimeString().slice(0, 5) : "12:00"
//   );

//   // sync when external value changes
//   useEffect(() => {
//     const fieldValue = form.getValues(name);
//     if (isDate(fieldValue)) {
//       setSelectedDate(fieldValue);
//       setSelectedTime(fieldValue.toTimeString().slice(0, 5));
//     }
//   }, [form, name]);

//   const handleDateChange = (date: Date | undefined) => {
//     if (!date) return;
//     const [hours, minutes] = selectedTime.split(":").map(Number);
//     date.setHours(hours);
//     date.setMinutes(minutes);
//     setSelectedDate(date);
//     form.setValue(name, date, { shouldValidate: true });
//   };

//   const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const time = e.target.value;
//     setSelectedTime(time);
//     if (selectedDate) {
//       const [hours, minutes] = time.split(":").map(Number);
//       const updatedDate = new Date(selectedDate);
//       updatedDate.setHours(hours);
//       updatedDate.setMinutes(minutes);
//       setSelectedDate(updatedDate);
//       form.setValue(name, updatedDate, { shouldValidate: true });
//     }
//   };

//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className="flex flex-col">
//           <FormLabel>{label}</FormLabel>
//           <Popover>
//             <PopoverTrigger asChild>
//               <FormControl>
//                 <Button
//                   variant="outline"
//                   className={cn(
//                     "w-[280px] pl-3 text-left font-normal",
//                     !field.value && "text-muted-foreground"
//                   )}
//                 >
//                   {field.value ? (
//                     new Date(field.value).toLocaleString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })
//                   ) : (
//                     <span>Pick a date and time</span>
//                   )}
//                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent
//               className="w-auto p-4 flex flex-col gap-4"
//               align="start"
//             >
//               <Calendar
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={handleDateChange}
//                 disabled={(date) =>
//                   date > new Date("2100-01-01") || date < new Date("1900-01-01")
//                 }
//                 captionLayout="dropdown"
//               />
//               <input
//                 type="time"
//                 value={selectedTime}
//                 onChange={handleTimeChange}
//                 className="border rounded px-2 py-1 text-sm"
//               />
//             </PopoverContent>
//           </Popover>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }
