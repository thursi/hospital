"use client";
import {
  editSpecializationById
} from "@/app/admin/specializations/action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Specialization } from "@/lib/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  specializationName: z.string({
    required_error: "Specialization name is required!",
  }),
  description: z.string(),
  departmentId: z.string({ required_error: "Department is required!" }),
});

type Props = {
  setOpen: (open: boolean) => void;
  reloadTable?: () => void; // Assuming you pass a function to reload the table
  specialization?: Specialization;
  id?: string;
  department?: any;
};

const SpecializationEditForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specializationName: props.specialization?.specializationName,
      description: props.specialization?.description,
      departmentId: props.specialization?.departmentId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await editSpecializationById(props.id!, values);
      props.setOpen(false); // Close the form
      if (props.reloadTable) props.reloadTable(); // Reload the table
    } catch (error) {
      console.error("Failed to create specialization:", error);
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
            name="specializationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization name</FormLabel>
                <FormControl>
                  <Input placeholder="Specialization name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.department.length > 0 ? (
                      props.department.map((department: any) => {
                        return (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <div className="px-3 font-semibold text-gray-400 text-center">
                        No options
                      </div>
                    )}
                  </SelectContent>
                </Select>
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

export default SpecializationEditForm;
