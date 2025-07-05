import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserProvider from "@/components/providers/UserProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pisade Demo",
  description: "By Pak",
};



export default async function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        {/* <ReduxProvider> */}
        <ReactQueryProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ReactQueryProvider>
        {/* </ReduxProvider> */}

      </body>
    </html>
  );
}
