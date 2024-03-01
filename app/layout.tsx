import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./navbar";
import Providers from "./components/Provider";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dorigin",
  description: "Dorigin",
};

export default function RootLayout({ children } : {children: React.ReactNode}) {
  
  return (
    <html lang="en">
      <body className={`defaultLayout relative top-[20px]`}>
        <Providers>{children}</Providers>
      </body>
      {/* <footer className=" absolute bottom-0 text-center left-[40%]">
         <small>
           COPYRIGHT &copy; 디오리진 건축사무소 All rights reserved.
           &nbsp;
          </small>
      </footer> */}
    </html>
  );
}
