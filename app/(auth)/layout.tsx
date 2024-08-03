import { GlobeDemo } from "@/components/GlobeDemo";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <GlobeDemo />
      </div>
    </main>
  );
}
