import React from "react";
import { Button } from "@repo/ui/components/shadcn/button";
import { Check, ChevronRight } from "lucide-react";

// Plan data type
type Plan = {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  buttonVariant?: "outline" | "secondary";
  wrapperClass?: string;
};

// Plans configuration
const plans: Plan[] = [
  {
    title: "STARTER",
    price: "$0",
    subtitle: "Free for everyone",
    features: ["Unlimited members", "250 transactions", "No support"],
    buttonText: "Start for free",
    buttonHref: "/signup",
    buttonVariant: "outline",
    wrapperClass: "bg-background max-md:border md:bg-transparent",
  },
  {
    title: "BASIC",
    price: "$29.99",
    subtitle: "per user per month",
    features: [
      "All free plan features and...",
      "Mainline AI",
      "Unlimited teams",
    ],
    buttonText: "7 days free",
    buttonHref: "/signup",
    buttonVariant: "secondary",
    wrapperClass:
      "max-md:from-primary max-md:to-primary/80 max-md:bg-linear-to-r md:bg-transparent",
  },
  {
    title: "ENTERPRISE",
    price: "$ENT",
    subtitle: "Custom pricing",
    features: [
      "All basic plan features and...",
      "Advanced security controls",
      "Migration support",
    ],
    buttonText: "Book a demo",
    buttonHref: "/",
    buttonVariant: "outline",
    wrapperClass: "bg-background max-md:border md:bg-transparent",
  },
];

// Reusable PlanCard component
const PlanCard: React.FC<Plan> = ({
  title,
  price,
  subtitle,
  features,
  buttonText,
  buttonHref,
  buttonVariant = "outline",
  wrapperClass = "",
}) => (
  <div
    className={`flex flex-col gap-6 rounded-xl p-6 sm:rounded-2xl md:rounded-none lg:p-8 ${wrapperClass}`}
  >
    <h3 className="font-mono text-sm tracking-widest text-foreground/70 md:text-background/70">
      {title}
    </h3>

    <div>
      <p className="text-5xl font-semibold tracking-tight text-foreground md:text-background">
        {price}
      </p>
      <p className="mt-2 text-xl font-medium text-foreground/70 md:text-background/70">
        {subtitle}
      </p>
    </div>

    <ul className="space-y-3 text-sm text-foreground/70 md:text-background/70">
      {features.map((feat) => (
        <li key={feat} className="flex items-center gap-2">
          <Check className="size-4 shrink-0" />
          <span>{feat}</span>
        </li>
      ))}
    </ul>

    <div className="flex flex-1 items-end">
      <Button
        asChild
        variant={buttonVariant}
        className={`group w-full h-10 ${buttonVariant === "outline" ? "md:text-background md:bg-transparent md:after:opacity-0" : "md:bg-background md:text-primary hover:md:bg-background/90"}`}
      >
        <a href={buttonHref}>
          {buttonText}
          <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </Button>
    </div>
  </div>
);

// Main Pricing component
export default function Pricing() {
  return (
    <section className="relative py-32 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Pricing
        </h1>
        <div className="mx-auto mt-4 max-w-[45rem] space-y-2">
          <p className="text-2xl text-muted-foreground md:text-3xl">
            Use Charter for free with your whole team. Upgrade to enable
            enhanced features.
          </p>
        </div>

        <div className="relative mt-8 md:mt-12 lg:mt-20">
          {/* Top pattern background */}
          <div className="absolute inset-0 hidden rounded-3xl bg-linear-to-r from-primary to-primary/80 md:block w-full overflow-hidden">
            <svg
              width="32"
              height="32"
              className="h-full w-screen text-foreground/[0.05] "
            >
              <defs>
                <pattern
                  id="plus-pattern-top"
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="8"
                    y1="5"
                    x2="8"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <line
                    x1="5"
                    y1="8"
                    x2="11"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#plus-pattern-top)" />
            </svg>
          </div>

          {/* Plan cards grid */}
          <div className="relative space-y-6 md:grid md:grid-cols-3 md:space-y-0 md:divide-x md:divide-background/20 md:p-6 lg:p-8">
            {plans.map((plan, idx) => (
              <PlanCard key={idx} {...plan} />
            ))}
          </div>
        </div>

        {/* Bottom spotlight background */}
        <div className="absolute -inset-40 z-[-1] [mask-image:radial-gradient(circle_at_center,black_0%,black_20%,transparent_75%)] w-full overflow-hidden">
          <svg
            width="32"
            height="32"
            className="h-full w-full text-foreground/[0.05]"
          >
            <defs>
              <pattern
                id="plus-pattern-bottom"
                x="0"
                y="0"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="8"
                  y1="5"
                  x2="8"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="5"
                  y1="8"
                  x2="11"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#plus-pattern-bottom)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
