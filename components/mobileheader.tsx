import { MobileSidebar } from "@/components/mobilesiderbar";

export const MobileHeader = () => {
    return (
        <nav className="px-6 fixed border-b top-0 left-0 w-full right-0 h-[50px] bg-green-500 lg:hidden flex z-50"> 
            <MobileSidebar />
        </nav>

    );
};

export default MobileHeader;