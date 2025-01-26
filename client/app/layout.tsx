
'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/customs/Header";
import { Bounce, ToastContainer } from 'react-toastify';
import { useEffect } from "react";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { hydrate, isLoading } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  if (isLoading) return null;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >



        <Header />

        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
