import type { Metadata } from "next";
import { Quicksand, Roboto } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOXYOS - Connecting Smiles",
  description: "Local Business Growth Operating System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
