import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import HolyLoader from "holy-loader";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "SCC Abuja Database",
  description: "Saints Community Church Abuja Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans", openSans.variable)}>
        <HolyLoader showSpinner />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
