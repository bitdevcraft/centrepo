export default function About2() {
  return (
    <section className="bg-muted py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-14 pb-32 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">ABOUT US</p>
            <h1 className="mt-4 text-3xl font-medium md:text-4xl">
              Simplifying Complex Workflows with Developer-Focused Solutions
            </h1>
          </div>
          <p className="md:text-lg">
            Our platform provides intuitive solutions for managing and scaling
            projects. We offer seamless integrations, clear abstractions, and
            powerful tools to enhance developer productivity and collaboration
            across teams of all sizes and experience levels.
          </p>
        </div>
        <img
          src="https://shadcnblocks.com/images/block/placeholder-dark-1.svg"
          alt="placeholder"
          className="ml-auto aspect-video max-h-[550px] rounded-xl object-cover"
        />
        <p className="mt-6 text-center text-xl lg:text-right">
          Committed to removing complexity from development processes
        </p>
        <div className="flex flex-col gap-14 py-40 lg:flex-row">
          <p className="mx-auto max-w-xl text-center text-2xl lg:mx-0 lg:text-left">
            We are a team of passionate developers, designers, and
            entrepreneurs.
          </p>
          <div className="grid grid-cols-2 items-center gap-6 md:grid-cols-4">
            <img
              src="https://shadcnblocks.com/images/block/logos/vercel-wordmark.svg"
              alt="logo"
              className="mx-auto max-h-7 md:mx-0"
            />
            <img
              src="https://shadcnblocks.com/images/block/logos/shadcn-ui-wordmark.svg"
              alt="logo"
              className="mx-auto max-h-9 md:mx-0"
            />
            <img
              src="https://shadcnblocks.com/images/block/logos/tailwind-wordmark.svg"
              alt="logo"
              className="mx-auto max-h-7 md:mx-0 md:max-h-9"
            />
            <img
              src="https://shadcnblocks.com/images/block/logos/supabase-wordmark.svg"
              alt="logo"
              className="mx-auto max-h-9 md:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
