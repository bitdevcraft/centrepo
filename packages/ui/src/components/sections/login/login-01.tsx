import { Button } from "@repo/ui/components/shadcn/button";
import { Label } from "@repo/ui/components/shadcn/label";
import { Input } from "@repo/ui/components/shadcn/input";
import { Checkbox } from "@repo/ui/components/shadcn/checkbox";

export default function Login() {
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
                <div>
                  <div className="grid gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          type="password"
                          id="password"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember"></Checkbox>
                        <label
                          htmlFor="remember"
                          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </label>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary">
                        Forgot password
                      </a>
                    </div>
                    <Button type="submit">Login</Button>
                    <Button variant="outline">
                      <img
                        src="https://shadcnblocks.com/images/block/logos/google-icon.svg"
                        className="mr-2 size-4"
                        alt="Google"
                      />
                      Login with Google
                    </Button>
                  </div>
                </div>
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
