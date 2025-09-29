import Sidebar from "@/components/sidebar";
import MobileBottomNav from "@/components/mobilebottomnav";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <Sidebar className="hidden lg:flex" />
    <main className="h-full lg:pl-[260px] pb-16 lg:pb-0">
      <div className="h-full max-w-[1056px] mx-auto pt-6">
        {children}
      </div>
    </main>
    <MobileBottomNav />
  </>
);

export default MainLayout;