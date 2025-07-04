import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/shadcn/carousel";

// Data for each feature slide
type FeatureData = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

const features: FeatureData[] = [
  {
    imageSrc:
      "https://shadcnblocks.com/images/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    imageAlt: "Seamless Collaboration",
    title: "Seamless Collaboration",
    description:
      "Collaborate with your team in real-time, ensuring everyone stays on the same page and projects move forward efficiently.",
  },
  {
    imageSrc:
      "https://shadcnblocks.com/images/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    imageAlt: "Intuitive Interface",
    title: "Intuitive Interface",
    description:
      "Our user-friendly design makes it easy for anyone to get started, reducing the learning curve and boosting productivity.",
  },
  {
    imageSrc:
      "https://shadcnblocks.com/images/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    imageAlt: "Powerful Integrations",
    title: "Powerful Integrations",
    description:
      "Connect with your favorite tools and services to streamline your workflow and automate repetitive tasks.",
  },
  {
    imageSrc:
      "https://shadcnblocks.com/images/block/photos/simone-hutsch-xYFl3Q9am1E-unsplash.jpg",
    imageAlt: "Advanced Analytics",
    title: "Advanced Analytics",
    description:
      "Gain valuable insights with comprehensive analytics and reporting features to help you make data-driven decisions.",
  },
];

// Reusable feature card component
const FeatureCard: React.FC<FeatureData> = ({
  imageSrc,
  imageAlt,
  title,
  description,
}) => (
  <CarouselItem
    role="group"
    aria-roledescription="slide"
    data-slot="carousel-item"
    className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3"
  >
    <div className="relative group h-[500px] place-self-end p-4">
      {/* Border and corner dots */}
      <div className="absolute top-4 -left-0 h-[1.5px] w-[115%] bg-muted"></div>
      <div className="absolute bottom-4 -left-0 h-[1.5px] w-[115%] bg-muted"></div>
      <div className="absolute -top-25 left-4 h-[130%] w-[1.5px] bg-muted"></div>
      <div className="absolute -top-25 right-4 h-[130%] w-[1.5px] bg-muted"></div>
      {[
        "top-[12.5px] left-[12.5px]",
        "top-[12.5px] right-[12.5px]",
        "bottom-[12.5px] left-[12.5px]",
        "right-[12.5px] bottom-[12.5px]",
      ].map((pos, idx) => (
        <div
          key={idx}
          className={`absolute ${pos} z-10 size-2 rounded-full bg-foreground`}
        />
      ))}

      <div
        data-slot="card"
        className="text-card-foreground flex flex-col gap-6 py-6 shadow-sm h-full w-full rounded-lg border border-border bg-muted"
      >
        <div
          data-slot="card-content"
          className="relative flex h-full flex-col items-center justify-center gap-6 p-6"
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="mb-4 size-40 rounded-lg object-cover"
          />
          <h3 className="mb-2 text-center text-2xl font-medium tracking-tighter text-foreground md:text-3xl">
            {title}
          </h3>
          <p className="text-center text-base tracking-tight text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  </CarouselItem>
);

// Main feature section with carousel controls
export default function Feature() {
  return (
    <section className="bg-background">
      <div className="container py-32 mx-auto">
        <div className="mb-16 max-w-2xl space-y-8 pl-4">
          <h2 className="text-5xl font-bold tracking-tighter text-foreground md:text-6xl">
            Explore our features
          </h2>
          <p className="text-lg tracking-tight text-muted-foreground md:text-xl">
            Discover the powerful features that help transform your workflow and
            drive business success.
          </p>
        </div>

        <Carousel>
          <CarouselContent>
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </CarouselContent>
          <div className="my-3 flex justify-end gap-3 pr-5">
            <CarouselPrevious className="top-1/2 -left-12 static m-0 size-12 translate-y-0 p-0" />
            <CarouselNext className="top-1/2 -right-12 static size-12 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
