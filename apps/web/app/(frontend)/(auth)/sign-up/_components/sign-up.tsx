"use client";

import { RegistrationFormValue, RegistrationSchema } from "@repo/cent-shared";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MultiStepForm,
  MultiStepFormContextProvider,
  MultiStepFormHeader,
  MultiStepFormStep,
} from "@repo/ui/components/multi-form";
import UserSignUpStep from "./user";
import { useForm } from "react-hook-form";
import OrganizationSignUpStep from "./organization";

export default function Login() {
  const form = useForm<RegistrationFormValue>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      user: {
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
      },
      organization: {
        logo: "",
        name: "",
        slug: "",
      },
    },
    reValidateMode: "onBlur",
    mode: "onChange",
  });
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2">
          <div className="relative overflow-hidden py-10">
            <div className="mx-auto my-auto flex h-full w-full max-w-md flex-col justify-center gap-4 p-6">
              <div className="mb-6 flex flex-col items-center text-center">
                <a
                  href="https://www.shadcnblocks.com"
                  className="mb-6 flex items-center gap-2"
                >
                  <img
                    src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-wordmark.svg"
                    className="max-h-12"
                    alt="Shadcn UI Navbar"
                  />
                </a>
              </div>
              <div className="w-full rounded-md bg-background">
                <MultiStepForm
                  className={"space-y-2"}
                  schema={RegistrationSchema}
                  form={form}
                  onSubmit={() => {}}
                >
                  <MultiStepFormHeader>
                    <MultiStepFormContextProvider>
                      {({ currentStepIndex }) => (
                        <div className="">
                          {
                            <p className="text-lg text-center font-semibold">
                              {currentStepIndex === 0
                                ? "Account"
                                : "Organization"}
                            </p>
                          }
                        </div>
                      )}
                    </MultiStepFormContextProvider>
                  </MultiStepFormHeader>
                  <MultiStepFormStep name="user">
                    <UserSignUpStep />
                  </MultiStepFormStep>
                  <MultiStepFormStep name="organization">
                    <OrganizationSignUpStep />
                  </MultiStepFormStep>
                </MultiStepForm>
              </div>
              <div className="mx-auto mt-3 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Don&apos;t have an account?</p>
                <a href="#" className="font-medium text-primary">
                  Signup
                </a>
              </div>
            </div>
          </div>
          <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder"
            className="hidden h-full max-h-screen rounded-md object-cover lg:block"
          />
        </div>
      </div>
    </section>
  );
}
