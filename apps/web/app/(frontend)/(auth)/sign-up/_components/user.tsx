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

import { ArrowRight } from "lucide-react";

export default function UserSignUpStep() {
  const { form, nextStep, isStepValid } =
    useMultiStepFormContext<typeof RegistrationSchema>();
  const { control } = form;

  return (
    <Form {...form}>
      <div className="flex flex-col justify-between gap-4 min-h-[50vh]">
        <div>
          <div className="space-y-6">
            <FormField
              control={control}
              name="user.name"
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
              name="user.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="user.password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="user.confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* navigation */}

        <div className="flex justify-end gap-2">
          <Button onClick={nextStep} disabled={!isStepValid()}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Form>
  );
}
