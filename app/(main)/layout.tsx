import Sidebar from "@/components/sidebar";
import MobileHeader from "@/components/mobileheader";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <MobileHeader />
    <Sidebar className="hidden lg:flex" />
    <main className="h-full lg:pl-[260px] pt-12 lg:pt-0">
      <div className="h-full max-w-[1056px] mx-auto pt-6">
        {children}
      </div>
    </main>
  </>
);

export default MainLayout;