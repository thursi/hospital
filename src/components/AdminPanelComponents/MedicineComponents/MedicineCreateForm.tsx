"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createMedicine } from "@/app/admin/medicines/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  name: z.string({ required_error: "Medicine name is required!" }),
  description: z.string({ required_error: "Description is required!" }),
  duration: z.number({ required_error: "Duration is required!" }),
});

type Props = {
  setOpen: (open: boolean) => void;
  reloadTable: () => void; // Assuming you pass a function to reload the table
};

const MedicineCreateForm = ({ setOpen, reloadTable }: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
      duration: 15,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await createMedicine(values);
      setOpen(false); // Close the form
      reloadTable(); // Reload the table
    } catch (error) {
      console.error("Failed to create department:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
        <div className="w-full flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Medicine description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <div className="w-full flex items-center space-x-2">
                    <span className="font-semibold text-gray-600 text-sm">
                      15mts
                    </span>
                    <Slider
                      max={60}
                      step={15}
                      min={15}
                      onChange={(e: any) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                    />
                    <span className="font-semibold text-gray-600 text-sm">
                      60mts
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="bg-red-500" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default MedicineCreateForm;
