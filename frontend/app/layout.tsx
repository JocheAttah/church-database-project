import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import HolyLoader from "holy-loader";
import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({ subsets: ["latin"], variable: "--font-sans" });

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
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={cn("min-h-screen font-sans", albertSans.variable)}>
          <HolyLoader
            showSpinner
            color="white"
            boxShadow="0 0 5px #ffffff, 0 0 7px #ffffff, 0 0 10px #ffffff"
          />
          <Toaster />
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
