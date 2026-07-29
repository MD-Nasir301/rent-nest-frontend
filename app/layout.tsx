import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";


export const metadata: Metadata = {
  title: "RentNest | Find Your Rental Home",
  description: "House Rental Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}