import { auth } from "@repo/cent-auth";
import { Button } from "@repo/ui/components/shadcn/button";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
