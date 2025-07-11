import { Button } from "@repo/ui/components/shadcn/button";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section className="bg-mint-[#E9EDE8] dark:bg-mint-[#2F332E] py-32">
      <div className="container mx-auto px-4 overflow-hidden ">
        <div className="max-w-xl lg:translate-x-32">
          <h2 className="mb-4 text-2xl font-semibold text-muted-foreground md:text-3xl">
            About Us
          </h2>
          <h1 className="max-w-[600px] flex-1 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
            We're Streamline. We're a different kind of planning tool that
            enables builders to create the future now.
          </h1>
        </div>
        <div className="relative mt-12 flex gap-4 justify-center">
          <div className="max-lg:-translate-x-20">
            <img
              src="https://shadcnblocks.com/images/block/placeholder-1.svg"
              alt="Modern workspace with an iMac displaying 'DO MORE'"
              width="800"
              height="500"
            />
          </div>
          <div className="border-mint-50 -right-10 bottom-0 aspect-[1.5/1.4] w-[max(30vw,220px)] translate-y-20 max-lg:absolute max-lg:border-[16px] lg:-translate-y-20">
            <img
              src="https://shadcnblocks.com/images/block/placeholder-2.svg"
              alt="Person working on a laptop"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-28 max-w-xl lg:mt-10 lg:translate-x-32">
          <p className="text-lg">
            Tasks have changed, are changing, and will continue to change — for
            the better. Now is the time for productivity to be user-first and
            internet-first. But in order to do this — it needs a new foundation.
          </p>
        </div>
        <div className="mt-6 space-y-6 md:mt-8 md:space-y-8 lg:mt-10 lg:space-y-10">
          <h2 className="max-w-xl text-2xl font-semibold md:text-3xl lg:translate-x-32">
            We were always told that to-do apps can't be dynamic systems.
          </h2>
          <p className="max-w-xl text-lg lg:translate-x-32">
            Everyone tried fixing the problem by adding features, integrations,
            and layers of complexity. We have spent our careers using,
            designing, and rethinking tools like Trello, Notion, and Asana,
            encountering this problem firsthand. The existing solutions don't
            work. We believe a to-do app needs to be a dynamic system. But we
            had to start from ground zero.
          </p>
          <div className="grid gap-6 py-6 md:grid-cols-2 lg:py-10">
            <img
              src="https://shadcnblocks.com/images/block/placeholder-3.svg"
              alt="Team members collaborating"
              width="600"
              height="400"
              className="rounded-lg mx-auto"
            />
            <img
              src="https://shadcnblocks.com/images/block/placeholder-4.svg"
              alt="Team meeting in a conference room"
              width="600"
              height="400"
              className="rounded-lg mx-auto"
            />
          </div>
          <p className="ml-auto max-w-xl text-lg lg:-translate-x-32">
            We started building Streamline in 2019 and launched in 2022. Every
            single feature has been built from scratch — with no unnecessary
            complexity or outdated tools. We are purpose-built to redefine
            productivity for the next hundred years.
          </p>
          <h2 className="ml-auto max-w-xl text-2xl font-semibold md:text-3xl lg:-translate-x-32">
            We are a bit of an unusual team — not your standard tech startup.
          </h2>
          <div className="ml-auto max-w-xl text-lg lg:-translate-x-32">
            <p>
              We are 100% founder and team-owned, sustainable, and we keep our
              team small. Over time, we'll make this page more polished, but
              right now we're focused on delivering for our users. If you'd
              <br />
              like to collaborate, check out our open roles:
            </p>
            <Button variant="outline">
              <a href="#" className="">
                <span className="flex items-center gap-2 text-start whitespace-pre-wrap">
                  View Open roles
                  <ArrowRight size={4} />
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
