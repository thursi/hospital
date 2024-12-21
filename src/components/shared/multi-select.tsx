// // import * as React from "react";
// // import { cn } from "@/lib/utils"; // Adjust import path as needed
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectContent,
// //   SelectGroup,
// //   SelectItem,
// //   SelectLabel,
// // } from "@/components/ui/select";

// // interface Props {
// //   options: any[];
// //   selectedValues: any[];
// //   onChange: (values: any[]) => void;
// //   placeholder?: string;
// // }

// // export function MultiSelect({
// //   options,
// //   selectedValues,
// //   onChange,
// //   placeholder,
// // }: Props) {
// //   const handleSelect = (value: string) => {
// //     const numericValue = value;

// //     if (selectedValues.includes(numericValue)) {
// //       onChange(selectedValues.filter((v: string) => v !== numericValue));
// //     } else {
// //       onChange([...selectedValues, numericValue]);
// //     }
// //   };

// //   console.log(selectedValues);

// //   return (
// //     <Select onValueChange={handleSelect}>
// //       <SelectTrigger>
// //         {selectedValues.length > 0
// //           ? selectedValues.join(", ")
// //           : placeholder || "Select options"}
// //       </SelectTrigger>
// //       <SelectContent>
// //         <SelectGroup>
// //           <SelectLabel>Options</SelectLabel>
// //           {options.map((option: any) => (
// //             <SelectItem key={option} value={option.toString()}>
// //               <div className="flex items-center">
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedValues.includes(option)}
// //                   className="mr-2"
// //                   readOnly
// //                 />
// //                 {option}
// //               </div>
// //             </SelectItem>
// //           ))}
// //         </SelectGroup>
// //       </SelectContent>
// //     </Select>
// //   );
// // }
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
// } from "@/components/ui/select";
// import { X } from "lucide-react";

// interface Option {
//   id: string;
//   name: string;
// }

// interface Props {
//   options: Option[];
//   selectedValues: string[];
//   onChange: (values: string[]) => void;
//   placeholder?: string;
// }

// export function MultiSelect({
//   options,
//   selectedValues,
//   onChange,
//   placeholder,
// }: Props) {
//   // Handle the selection of an option
//   const handleSelect = (value: string) => {
//     if (value && !selectedValues.includes(value)) {
//       onChange([...selectedValues, value]);
//     }
//   };

//   // Handle removal of an option
//   const handleRemove = (id: string) => {
//     onChange(selectedValues.filter((v) => v !== id));
//   };

//   // Get the available options by filtering out the selected ones
//   const availableOptions = options.filter(
//     (option) => !selectedValues.includes(option.id)
//   );

//   return (
//     <div className="space-y-2">
//       <div className="flex flex-wrap gap-2">
//         {selectedValues.map((id) => {
//           const option = options.find((o) => o.id === id);
//           return (
//             <span
//               key={id}
//               className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-200"
//             >
//               {option?.name}
//               <button
//                 onClick={() => handleRemove(id)}
//                 className="ml-1 p-1 rounded-full hover:bg-gray-300"
//               >
//                 <X size={12} />
//               </button>
//             </span>
//           );
//         })}
//       </div>
//       <Select onValueChange={handleSelect}>
//         <SelectTrigger className="w-full">
//           {placeholder || "Select options"}
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectLabel>Options</SelectLabel>
//             {availableOptions.map((option) => (
//               <SelectItem key={option.id} value={option.id}>
//                 {option.name}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface Option {
  id: number;  // Ensure 'id' is treated as a number
  name: string;
}

interface Props {
  options: Option[];
  selectedValues: number[]|any; 
  onChange: (values: number[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder,
}: Props) {
  const handleSelect = (value: string) => {
    console.log(value)
    const numericValue = Number(value);  // Convert the value to a number
    if (numericValue && !selectedValues.includes(numericValue)) {
      console.log('conditon fullfiled')
      onChange([...selectedValues, numericValue]); // Add the numeric value
    }
  };

  const handleRemove = (id: number) => {
    onChange(selectedValues.filter((v:any) => v !== id)); // Remove the numeric value
  };

  // Get the available options by filtering out the selected ones
  const availableOptions = options?.filter(
    (option) => !selectedValues.includes(option.id)
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedValues.map((id:any) => {
          const option = options.find((o) => o.id === id);
          return (
            option?.name && (
              <span
                key={id}
                className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-200"
              >
                {option.name}
                <button
                  onClick={() => handleRemove(id)}
                  className="ml-1 p-1 rounded-full hover:bg-gray-300"
                >
                  <X size={12} />
                </button>
              </span>
            )
          );
        })}
      </div>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full">
          {placeholder || 'Select options'}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            {availableOptions?.map((option) => {
              return (
                <SelectItem key={option.id} value={String(option.id)}>  {/* Convert the number to string for compatibility with SelectItem */}
                  {option.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
