import "./globals.css";
import { Inter } from "next/font/google";
import "@fontsource/vazirmatn";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}