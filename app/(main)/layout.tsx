import Sidebar from "@/components/sidebar";
import MobileHeader from "@/components/mobileheader";

type Props = {
    children: React.ReactNode;
}

const mainLayout = ({ children }: Props) => {
    return (
        <>
            <MobileHeader />
            <Sidebar className="hidden lg:flex"/>
            <main className="h-full lg:pl-[260px] pt-[50px] lg:pt-0">
                <div className="bg-red-500 h-full">
                    {children}
                </div>
                
            </main>
        </>
    );
};
export default mainLayout;