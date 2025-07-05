import { Geist, Geist_Mono } from "next/font/google";

import "@repo/ui/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@repo/ui/components/shadcn/sonner";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "@repo/ui/lib/utils";
import { getLocale, getMessages } from "next-intl/server";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} className="h-full w-full" suppressHydrationWarning>
      <body className={cn(fontMono.className, "h-full min-h-screen")}>
        <NextIntlClientProvider messages={messages}>
          <div className="h-full min-h-0 w-full">
            <Providers>{children}</Providers>
            <Toaster
              toastOptions={{
                closeButton: true,
                style: {
                  fontWeight: "lighter",
                },
                classNames: {
                  toast: "text-[15px] pr-16",
                  closeButton: "bg-white",
                  error: "bg-red-50 text-red-700 border border-red-400",
                  warning:
                    "bg-orange-50 text-orange-700 border border-orange-400",
                  success: "bg-indigo-500 text-white border border-indigo-800",
                  info: "bg-blue-50 text-blue-700 border border-blue-400",
                },
              }}
            />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
