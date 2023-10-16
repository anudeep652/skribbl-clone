import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import RoomContextProvider from "@/context/roomsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skribbl Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <RoomContextProvider>
          <body className={inter.className}>{children}</body>
        </RoomContextProvider>
      </html>
    </ClerkProvider>
  );
}
