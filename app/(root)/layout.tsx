import SideBar from "@/components/SideBar";
import Home from "./page";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = {firstName: 'Garland',lastName:'Thompson'}
  return (
   <main className="flex h-screen w-full font-inter">
    <SideBar user={loggedIn}/>
     <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
         src="/icons/logo.svg"
         width={30}
         height={30}
         alt="menu icon"
          />
          <div>
            <MobileNav  user={loggedIn}/>
        </div>
        </div>
    {children}
   </div>
   </main>
  );
}
