"use client";

import React from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@repo/ui/components/shadcn/button";
import { motion } from "motion/react";

type CardProps = {
  year: string;
  month: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

const Card: React.FC<CardProps> = ({
  year,
  month,
  title,
  description,
  imageSrc,
  imageAlt,
  className = "",
}) => (
  <div className={`relative group h-160 max-w-120 p-4 ${className}`}>
    {/* Border lines */}
    <motion.div
      initial={{ width: 0, backgroundColor: `var(--muted-foreground)` }}
      animate={{ width: "115%", backgroundColor: `var(--muted)` }}
      transition={{ delay: 0.2 }}
      className="absolute top-4 -left-25 h-[1.5px] w-[115%]"
    />
    <motion.div
      initial={{ width: 0, backgroundColor: `var(--muted-foreground)` }}
      animate={{ width: "115%", backgroundColor: `var(--muted)` }}
      transition={{ delay: 0.6 }}
      className="absolute bottom-4 -left-25 h-[1.5px] w-[115%]"
    />
    <motion.div
      initial={{ height: 0, backgroundColor: `var(--muted-foreground)` }}
      animate={{ height: "130%", backgroundColor: `var(--muted)` }}
      transition={{ delay: 0.4 }}
      className="absolute -top-25 left-4 h-[130%] w-[1.5px] bg-muted"
    />
    <motion.div
      initial={{ height: 0, backgroundColor: `var(--muted-foreground)` }}
      animate={{ height: "130%", backgroundColor: `var(--muted)` }}
      transition={{ delay: 0.8 }}
      className="absolute -top-25 right-4 h-[130%] w-[1.5px] bg-muted"
    />

    {/* Corner dots */}
    {[
      "top-[12.5px] left-[12.5px]",
      "top-[12.5px] right-[12.5px]",
      "bottom-[12.5px] left-[12.5px]",
      "right-[12.5px] bottom-[12.5px]",
    ].map((pos, index) => (
      <motion.div
        initial={{ opacity: 0, scale: 3 }}
        animate={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.3 }}
        key={index}
        className={`absolute ${pos} z-10 size-2 rounded-full bg-foreground`}
      />
    ))}

    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      className="relative h-full w-full bg-muted-2/50 p-4 transition-all ease-in-out group-hover:bg-muted-2"
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
      </div>
      <div className="absolute top-4 -ml-4 flex h-full w-full flex-col items-center justify-between p-10">
        <p className="flex w-full items-center text-xl tracking-tighter text-background">
          {year} <span className="mx-2 h-2.5 w-[1px] bg-white" /> {month}
        </p>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center text-6xl font-semibold tracking-tight text-background">
            {title}
          </h2>
          <div className="mt-2 h-1 w-6 rounded-full bg-background" />
          <p className="mt-10 max-w-sm px-2 text-center text-lg leading-5 font-light tracking-tighter text-background/80">
            {description}
          </p>
        </div>
        <a
          href="#"
          className="group mb-6 flex cursor-pointer flex-col items-center justify-center text-background"
        >
          <ChevronUp
            size={30}
            className="transition-all ease-in-out group-hover:-translate-y-2"
          />
          <p className="text-xl tracking-tight text-background">See All</p>
        </a>
      </div>
    </motion.div>
  </div>
);

const SignUpButton: React.FC = () => {
  return (
    <Button
      data-slot="button"
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary hover:bg-primary/90 h-9 has-[>svg]:px-3 rounded-2xl px-6 py-6 text-background shadow-[0px_1px_3px_#0000001a,inset_0px_2px_0px_#ffffff40] md:rounded-3xl md:px-12 md:py-8 md:text-lg"
    >
      <p className="mr-1 text-xl text-background md:mr-3 md:text-2xl"></p>
      Sign up for free
    </Button>
  );
};

const HeroSection: React.FC = () => (
  <section className="bg-background py-32">
    <div className="relative container flex flex-col items-center px-4! mx-auto">
      <div className="container flex w-full flex-col justify-between px-10 lg:flex-row">
        <div className="flex w-full flex-col gap-8">
          <a href="/" className="text-2xl font-semibold tracking-tighter">
            Bit Starter
          </a>
          <h1 className="bg-re relative z-20 text-6xl font-semibold tracking-tighter md:text-8xl">
            The Blocks Built With Shadcn & Tailwind.
          </h1>
          <p className="max-w-2xl tracking-tight text-muted-foreground md:text-xl">
            Finely crafted components built with React, Tailwind and Shadcn UI.
            Developers can copy and paste these blocks directly into their
            project.
          </p>
        </div>
        <div className="mt-8 flex flex-col items-start md:mt-18 lg:w-5/9 lg:items-center">
          <SignUpButton />
        </div>
      </div>
      <div className="flex w-full flex-col justify-between md:mt-10 md:flex-row">
        <Card
          year="2025"
          month="March"
          title="Shadcn Carousal"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure debitis."
          imageSrc="/images/hero-sample.jpg"
          imageAlt="aiImage"
        />
        <Card
          year="2025"
          month="March"
          title="Shadcn Carousal"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure debitis."
          imageSrc="/images/hero-sample.jpg"
          imageAlt="aiImage"
          className="lg:-mt-60"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;
