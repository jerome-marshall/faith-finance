import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className=" flex-1 px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
}
