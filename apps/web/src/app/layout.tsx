import "~/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import { AppHeader } from "~/components/app-header";

const inter = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <AppHeader />
            <div style={{ height: "100%" }}>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
