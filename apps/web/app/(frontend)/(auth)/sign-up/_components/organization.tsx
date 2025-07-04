"use client";

import { RegistrationSchema } from "@repo/cent-shared";
import { useMultiStepFormContext } from "@repo/ui/components/multi-form";
import { Button } from "@repo/ui/components/shadcn/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@repo/ui/components/shadcn/form";
import { Input } from "@repo/ui/components/shadcn/input";

import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OrganizationSignUpStep() {
  const { form, nextStep, prevStep, isStepValid } =
    useMultiStepFormContext<typeof RegistrationSchema>();
  const { control } = form;

  return (
    <Form {...form}>
      <div className="flex flex-col justify-between gap-4 min-h-[50vh]">
        <div>
          <div className="space-y-6">
            <FormField
              control={control}
              name="organization.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="organization.slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Slug" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* navigation */}

        <div className="flex justify-end gap-2">
          <Button onClick={prevStep}>
            <ArrowLeft className="ml-2 h-4 w-4" />
            Prev
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </Form>
  );
}
