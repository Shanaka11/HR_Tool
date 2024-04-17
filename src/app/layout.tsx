import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./(components)/SessionProvider";
import { UserProvder } from "./(components)/UserProvider";
import TitleBar from "./(components)/Navigation/TitleBar";
import MainPageLayout from "./(components)/MainPageLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HR Tool",
  description: "A simple application to manage human resources",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  // if session is not null then call backend to get the data from user table
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <UserProvder userInfo={{ name: session?.user?.name }}>
            <main className="grid grid-rows-[3.5rem_1fr] h-dvh">
              <TitleBar />
              <MainPageLayout>{children}</MainPageLayout>
            </main>
          </UserProvder>
        </SessionProvider>
      </body>
    </html>
  );
}
