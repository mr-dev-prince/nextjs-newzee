import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { UserContextProvider } from "@/context/user.context";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Newzee.",
  description: "One-stop place for all the news that you need to know.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <Theme>
            <Header />
            {children}
            <Footer />
          </Theme>
        </UserContextProvider>
      </body>
    </html>
  );
}
