import React from "react";
import { ChevronUp } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/shadcn/carousel";

// Data for each service slide
type ServiceSlide = {
  year: string;
  month: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const slides: ServiceSlide[] = [
  {
    year: "2025",
    month: "August",
    title: "Performance Optimization",
    description:
      "Techniques for improving web application speed and user experience.",
    imageSrc:
      "https://shadcnblocks.com/images/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    imageAlt: "Performance Optimization",
  },
  {
    year: "2025",
    month: "April",
    title: "React Innovations",
    description:
      "Discover cutting-edge React techniques and best practices for building dynamic interfaces.",
    imageSrc:
      "https://shadcnblocks.com/images/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    imageAlt: "React Innovations",
  },
  {
    year: "2025",
    month: "July",
    title: "Frontend Architecture",
    description:
      "Learn advanced strategies for building robust and maintainable frontend applications.",
    imageSrc:
      "https://shadcnblocks.com/images/block/photos/simone-hutsch-xYFl3Q9am1E-unsplash.jpg",
    imageAlt: "Frontend Architecture",
  },
  {
    year: "2025",
    month: "May",
    title: "UI/UX Trends",
    description:
      "Uncover the latest design trends shaping user experience and interface development.",
    imageSrc:
      "https://shadcnblocks.com/images/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    imageAlt: "UI/UX Trends",
  },
  {
    year: "2025",
    month: "June",
    title: "Component Design",
    description:
      "Master the art of creating reusable and scalable React components.",
    imageSrc:
      "https://shadcnblocks.com/images/block/photos/simone-hutsch-majMgWtrF48-unsplash.jpg",
    imageAlt: "Component Design",
  },
];

// Reusable slide card component
const SlideCard: React.FC<ServiceSlide> = ({
  year,
  month,
  title,
  description,
  imageSrc,
  imageAlt,
}) => (
  <CarouselItem className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3">
    <div className="relative group h-150 w-full place-self-end p-4">
      {/* Border lines */}
      <div className="absolute top-4 -left-[28px] h-[1.5px] w-[100%] bg-muted" />
      <div className="absolute bottom-4 -left-[28px] h-[1.5px] w-[100%] bg-muted" />
      <div className="absolute -top-25 left-4 h-[130%] w-[1.5px] bg-muted" />
      <div className="absolute -top-25 right-4 h-[130%] w-[1.5px] bg-muted" />
      {/* Corner dots */}
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

      <div className="relative h-full w-full bg-muted-2/50 p-4 transition-all ease-in-out group-hover:bg-muted-2">
        <div className="relative h-full w-full overflow-hidden rounded-3xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-all ease-in-out group-hover:scale-125"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
        </div>
        <div className="absolute top-4 -ml-4 flex h-full w-full flex-col items-center justify-between p-10">
          <p className="flex w-full items-center text-xl tracking-tighter text-background">
            {year}
            <span className="mx-2 h-2.5 w-[1px] bg-white" />
            {month}
          </p>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center text-5xl font-semibold tracking-tight text-background">
              {title}
            </h2>
            <div className="mt-2 h-1 w-6 rounded-full bg-background" />
            <p className="mt-10 max-w-sm px-2 text-center leading-5 font-light tracking-tighter text-background/80">
              {description}
            </p>
          </div>
          <a
            href="#"
            className="group mb-6 flex flex-col items-center justify-center text-background"
          >
            <ChevronUp className="transition-all ease-in-out group-hover:-translate-y-2" />
            <p className="text-xl tracking-tight text-background">See All</p>
          </a>
        </div>
      </div>
    </div>
  </CarouselItem>
);

// Main Services component
export default function Services() {
  return (
    <section className="bg-background py-32">
      <div className="relative container mx-auto">
        <h1 className="z-10 mb-10 text-center text-6xl font-bold tracking-tighter text-foreground">
          Services
        </h1>

        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {slides.map((slide, idx) => (
              <SlideCard key={idx} {...slide} />
            ))}
          </CarouselContent>
          <div className="mt-5 flex justify-end gap-3">
            <CarouselPrevious className="top-1/2 -left-12 static m-0 size-12 translate-y-0 p-0" />
            <CarouselNext className="top-1/2 -right-12 static size-12 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
