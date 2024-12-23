"use client";
import {
  editDepartmentById
} from "@/app/admin/departments/action";
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
import { Textarea } from "@/components/ui/textarea";
import { Department } from "@/lib/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string({ required_error: "Department name is required!" }),
  description: z.string(),
});

type Props = {
  setOpen: (open: boolean) => void;
  reloadTable?: () => void; // Assuming you pass a function to reload the table
  department?: Department;
  id?: string;
};

const DepartmentEditForm = ({
  setOpen,
  reloadTable,
  department,
  id,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: department?.name,
      description: department?.description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await editDepartmentById(id!, values);
      setOpen(false); // Close the form
      if (reloadTable) reloadTable(); // Reload the table
    } catch (error) {
      console.error("Failed to create department:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full px-2"
      >
        <div className="w-full gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department name</FormLabel>
                <FormControl>
                  <Input placeholder="Department name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your description here."
                    {...field}
                  />
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

export default DepartmentEditForm;
